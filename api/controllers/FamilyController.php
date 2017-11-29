<?php
namespace app\controllers;

use app\models\Family;
use app\models\Person;
use app\models\PersonFamily;
use yii\web\BadRequestHttpException;

class FamilyController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => [
                        'list',
                        'new',
                        'update',
                        'accept',
                        'remove',
                        'ignore',
                        'set-role',
                        'link'
                    ],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    /**
     * @inheritdoc
     */
    public function beforeAction($action)
    {
        $allowedActions = [
            'new', 'update', 'accept',
            'remove', 'ignore', 'set-role',
            'link'
        ];

        if (in_array($action->id, $allowedActions)) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }

    /**
     * @api
     * @see using $_POST['family'] directly
     * @throws BadRequestHttpException
     */
    public function actionDelete() // on post
    {
        $post = \Yii::$app->request->post();
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * @api
     * @see using $_POST['family'] directly
     * @throws BadRequestHttpException
     */
    public function actionUpdate() // on post
    {
        $post = \Yii::$app->request->post();
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * @api
     * @see Family (in family.model.ts), using $_POST['family'] directly
     * @throws BadRequestHttpException
     * @return Family
     */
    public function actionNew()
    {
        $post = \Yii::$app->request->post();
        if ($post) {
            if (!empty($post['name']) && empty($post['id'])) {
                $fam = new Family();
                $fam->name = $post['name'];
                if (!$fam->save()) {
                    throw new BadRequestHttpException(json_encode($fam->getFirstError()));
                }
            }
            if (!empty($post['id'])) {
                $fam = Family::findOne($post['id']);
            }
            if (isset($post['members']) && isset($fam)) {
                foreach ($post['members'] as $uid => $data) {
                    $person = Person::find()->where(['uid'=>$uid])->one();
                    if ($person) {
                        PersonFamily::deleteAll(['person_id' => $person->id, 'is_primary' => true]);
                        try {
                            $fam->link('members', $person);
                            $person->setDefaultRole();
                            $person->save();
                            $fam->setPrimaryMember($person->id);
                        } catch (\Throwable $e) {
                            throw new BadRequestHttpException($e->getMessage());
                        }
                    }
                }
            }
            return Family::findOne($fam->id)->toResponseArray();
        }
        throw new BadRequestHttpException('Wrong or missing parameters');
    }

    /**
     * @api
     * @param $id (the uid of person table)
     * @see Family (in family.model.ts), using $_POST['family'] directly
     * @throws BadRequestHttpException
     * @return Family
     */
    public function actionRemove($id = 0)
    {
        $post = \Yii::$app->request->post();
        $person = Person::find()
            ->where(['uid'=>$id])
            ->one();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post) . ' ** ' . json_encode($person);
        }
        if (!$person || empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No person or empty POST' . ': [' . $dbg . ']');
        }

        try {
            PersonFamily::findOne([
                'family_id' => $post['family']['id'],
                'person_id' => $person->id
            ])->delete();
        } catch (\Throwable $e) {
            throw new BadRequestHttpException('Error in delete from family: ' . $e->getMessage());
        }

        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    /**
     * @api
     * @param $id (the uid of person table)
     * @see Family (in family.model.ts), using $_POST['family'] directly
     * @throws BadRequestHttpException
     * @return Family
     */
    public function actionIgnore($id = 0)
    {
        $post = \Yii::$app->request->post();
        $unrelated = [];

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post);
        }
        if (empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No family or empty POST' . ': [' . $dbg . ']');
        }

        // ignore suggested member and save to family, so no suggestions appear again
        $family = Family::findOne($post['family']['id']);
        $unrelated = !empty($family->unrelated) ? json_decode($family->unrelated) : [];
        array_push($unrelated, $post['member']);
        $family->unrelated = json_encode($unrelated);
        if (!$family->save()) {
            throw new BadRequestHttpException(json_encode($family->getFirstErrors()));
        }
        return $family->toResponseArray();
    }

    /**
     * @api
     * @param $id (the uid of person table)
     * @see Family (in family.model.ts), using $_POST['family'] directly
     * @throws BadRequestHttpException
     * @return Family
     */
    public function actionAccept($id = 0)
    {
        $post = \Yii::$app->request->post();
        $person = Person::find()
            ->where(['uid'=>$id])
            ->one();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post) . ' ** ' . json_encode($person);
        }
        if (!$person || empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No person or empty POST' . ': [' . $dbg . ']');
        }

        try {
            $family = Family::findOne($post['family']['id']);
            if (!empty($family)) {
                // accept suggested member to family
                $family->link('members', $person);
                // update role
                if (isset($post['role'])) {
                    $person->role = $post['role'];
                } else {
                    $person->setDefaultRole();
                }
                $person->save();
                if ($post['isPrimary'] && boolval($post['isPrimary'])) {
                    $family->setPrimaryMember($person->id);
                }
            }
        } catch (\Throwable $e) {
        }
        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    /**
     * @api
     * @param $id (the uid of person table)
     * @see Family (in family.model.ts), using $_POST['family'], $_POST['role'] directly
     * @throws BadRequestHttpException
     * @return Family
     */
    public function actionLink($id = 0)
    {
        $post = \Yii::$app->request->post();
        $person = Person::find()
            ->where(['uid'=>$id])
            ->one();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post) . ' ** ' . json_encode($person);
        }
        if (!$person || empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No person or empty POST' . ': [' . $dbg . ']');
        }

        try {
            $fam = Family::findOne($post['family']['id']);
            $fam->link('members', $person);
            // accept suggested member to family
            if (isset($post['role']) && !empty($post['role'])) {
                $pfam = PersonFamily::find()->where([
                    'family_id' => $fam->id,
                    'person_id' => $person->id
                ])->one();
                $pfam->role = $post['role'];
                $pfam->save();
            }
        } catch (\Throwable $e) {
            throw new BadRequestHttpException('Error in link to family: '
                . $e->getMessage());
        }
        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    /**
     * @api
     * @param $id (the uid of person table)
     * @see Family (in family.model.ts), using $_POST['family'], $_POST['role'] directly
     * @throws BadRequestHttpException
     * @throws \Throwable
     * @return Family
     */
    public function actionSetRole($id = 0)
    {
        $post = \Yii::$app->request->post();
        $person = Person::findOne(['uid' => $id]);

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post)
                . ' ** ' . json_encode($person);
        }

        if (empty($post) || !isset($post['family']) || empty($person)) {
            throw new BadRequestHttpException('Some objects could not be created' . ': [' . $dbg . ']');
        }

        $fam = Family::findOne($post['family']['id']);
        $pfam = PersonFamily::find()
            ->where([
                'family_id' => $post['family']['id'],
                'person_id' => $person->id
            ])
            ->one();

        // Change role if Family object contains a role string
        if (isset($post['role']) && !empty($post['role'])) {
            try {
                $pfam->role = $post['role'];
                $pfam->save();
            } catch (\Throwable $e) {
                throw new BadRequestHttpException('Error in add new family: '
                    . json_encode($e->getMessage()));
            }
        }
        return $fam->toResponseArray();
    }

    /**
     * @api
     * @param $id (the family id)
     * @return Family[]
     */
    public function actionList($id = 0)
    {
        $ret = [];
        $families = Family::find()
            ->with('members')
            ->orderBy(['name' => SORT_ASC])
            ->all();

        foreach ($families as $family) {
            $ret[] = $family->toResponseArray();
        }
        return $ret;
    }

    /**
     * @param $id
     * @return Family
     */
    protected function findModel($id)
    {
        $family = Family::findOne($id);
        if ($family === null) {
            throw new NotFoundHttpException('The requested family does not exist.');
        }
        return $family;
    }
}
