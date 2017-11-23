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
            if (isset($post['members'])) {
                foreach ($post['members'] as $uid) {
                    $person = Person::find()->where(['uid'=>$uid])->one();
                    if ($person) {
                        try {
                            $fam->link('members', $person);
                        } catch (\yii\base\InvalidCallException $e) {
                            throw new BadRequestHttpException(json_encode($fam->getFirstError()));
                        }
                    }
                }
            }
            return $fam->toResponseArray();
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
    public function actionRemove($id = 0) {
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

        $t = PersonFamily::getDb()->beginTransaction();
        try {
            PersonFamily::findOne([
                'family_id' => $post['family']['id'],
                'person_id' => $person->id
            ])->delete();

            $fam = Family::findOne($post['family']['id']);
            $primary = json_decode($fam->primary);
            $key = array_search($id,$primary);
            if($key!==false){
                unset($primary[$key]);
            }
            $fam->primary = $primary;
            $fam->save();
            $t->commit();
        } catch(\Throwable $e) {
            $t->rollBack();
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
    public function actionIgnore($id = 0) {
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
    public function actionAccept($id = 0) {
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

        $family = Family::findOne($post['family']['id']);

        // accept suggested member to family
        if (!empty($family)) {
            $family->link('members', $person);
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
    public function actionLink($id = 0) {
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

        $fam = Family::findOne($post['family']['id']);

        // accept suggested member to family
        if (!empty($fam)) {
            $fam->link('members', $person);
            if ($post['primary']) {
                $fam->primary = json_encode($post['primary']);
                $fam->save();
            }
        }
        if (isset($post['role']) && !empty($post['role'])) {
            $pfam = PersonFamily::find()->where(['family_id'=>$fam->id])->one();
            $pfam->role = $post['role'];
            if (!$pfam->save()) {
                throw new BadRequestHttpException('Error in add link to family: '
                    . json_encode($pfam->errors));
            }
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
    public function actionSetRole($id = 0) {
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
            $t = Family::getDb()->beginTransaction();
            try {
                $primary = isset($fam->primary) ? json_decode($fam->primary) : [];
                if (empty($primary) || !in_array($id, $primary)) {
                    array_push($primary, $id);
                    $fam->primary = json_encode($primary);
                    $fam->save();
                }
                $pfam->role = $post['role'];
                $pfam->save();
                $t->commit();
            } catch (\Throwable $e) {
                $t->rollBack();
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
