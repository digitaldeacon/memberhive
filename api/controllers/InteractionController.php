<?php
namespace app\controllers;

use app\models\Interaction;
use app\models\Person;
use app\models\PersonInteraction;
use yii\web\BadRequestHttpException;

class InteractionController extends MHController
{
    public $interactionType = 'person';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => [
                        'list',
                        'get',
                        'update',
                        'create-person',
                        'create-group',
                        'list-types',
                        'delete',
                        'mine',
                        'complete',
                        'end'],
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
            'create-person',
            'create-group',
            'delete',
            'complete',
            'end'
        ];

        if (in_array($action->id, $allowedActions)) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }

    /**
     * @inheritdoc
     */
    public function actionDelete() // on post
    {
        $post = \Yii::$app->request->post();
        if (!empty($post)) {
            $interaction = $this->findModel($post['id']);
            if ($interaction->authorId == $post['author']) {
                if (!$interaction->delete()) {
                    return ['response' => json_encode($interaction->errors)];
                }
                return ['response' => true];
            } else {
                throw new BadRequestHttpException('This is not yours to delete!');
            }
        }
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * @inheritdoc
     */
    public function actionComplete() // on post
    {
        $post = \Yii::$app->request->post();
        if (!empty($post)) {
            $pinteraction = PersonInteraction::findOne(['interaction_id'=>$post['id']]);
            if ($pinteraction->interaction->authorId == $post['author']) {
                $pinteraction->completedOn = boolval($post['complete']) ? date('Y-m-d H:i:s') : null;
                if (!$pinteraction->save()) {
                    return ['response' => json_encode($pinteraction->errors)];
                }
                return ['response' => $pinteraction->interaction->toResponseArray()];
            } else {
                throw new BadRequestHttpException('This is not yours to delete!');
            }
        }
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * @inheritdoc
     */
    public function actionEnd() // on post
    {
        $post = \Yii::$app->request->post();
        if (!empty($post)) {
            $pinteraction = PersonInteraction::findOne(['interaction_id'=>$post['id']]);
            if ($pinteraction->interaction->authorId == $post['author']) {
                $pinteraction->doneOn = date('Y-m-d H:i:s');
                if (!$pinteraction->save()) {
                    return ['response' => json_encode($pinteraction->errors)];
                }
                return ['response' => true];
            } else {
                throw new BadRequestHttpException('This is not yours to end!');
            }
        }
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * url: /api/interaction/create-person or create-group interaction POST
     */
    private function actionCreate()
    {
        $post = \Yii::$app->request->post();
        $interaction = new Interaction();
        $insert = true;

        if (!empty($post)) {
            // throw new BadRequestHttpException(json_encode($post));
            if (isset($post['uid'])) {
                $interaction = $this->findModelByUID($post['uid']);
                $insert = empty($interaction);
            }

            $transaction = Interaction::getDb()->beginTransaction();
            try {
                $interaction->text = $post['text'];
                $interaction->typeId = intval($post['type']);
                $interaction->ownerId = $post['owner'];
                $interaction->authorId = $post['authorId'];
                $interaction->dueOn = isset($post['dueOn']) ? date('Y-m-d H:i', strtotime($post['dueOn'])) : null;
                $interaction->isPrivate = isset($post['isPrivate']) ? intval($post['isPrivate']) : 0;
                if ($interaction->save()) {
                    if ($this->interactionType == 'person') {
                        if (!$insert && $interaction->id) {
                            PersonInteraction::deleteAll(['interaction_id'=>$interaction->id]);
                        }
                        foreach ($post['recipients'] as $recipient) {
                            $junction = new PersonInteraction();
                            $junction->interaction_id = $interaction->id;
                            $junction->person_id = Person::findOne(['uid'=>$recipient])->id;
                            if (!$junction->save()) {
                                $transaction->rollBack();
                                throw new BadRequestHttpException(json_encode($junction->errors));
                            }
                        }
                    } elseif ($this->interactionType == 'group') {
                        // new GroupInteraction();
                    }
                    $transaction->commit();
                    return ['response' => $interaction->toResponseArray()];
                } else {
                    throw new BadRequestHttpException(json_encode($interaction->errors));
                }
            } catch (\Exception $e) {
                $transaction->rollBack();
                throw new BadRequestHttpException(json_encode($interaction));
            } catch (\Throwable $e) {
                $transaction->rollBack();
                throw new BadRequestHttpException(json_encode($interaction->errors));
            }
            return ['response' => $interaction->toResponseArray()];
        } else {
            throw new BadRequestHttpException('No valid data was received');
        }
    }

    public function actionCreatePerson()
    {
        $this->interactionType = 'person';
        return $this->actionCreate();
    }

    public function actionCreateGroup()
    {
        $this->interactionType = 'group';
        return $this->actionCreate();
    }

    public function actionList($id)
    {
        $ret = [];
        $noMarkup = isset($_GET['noMarkup']) ? boolval($_GET['noMarkup']) : true;
        $interactions = Interaction::find()
            ->where(['ownerId' => $id])
            ->with('recipients', 'author')
            ->orderBy(['updated_at'=>SORT_DESC])
            ->all();
        foreach ($interactions as $interaction) {
            $ret[] = $interaction->toResponseArray($noMarkup);
        }
        return ['response' => $ret];
    }

    public function actionMine($id)
    {
        $ret = [];
        $noMarkup = isset($_GET['noMarkup']) ? boolval($_GET['noMarkup']) : true;
        $interactions = Interaction::find()
            ->with(
                [
                'recipients' => function ($query) use ($id) {
                    $query->andWhere(['id' => $id]);
                },
                'author',
                'personInteraction',
                'type'
                ]
            )
            ->orderBy(['updated_at'=>SORT_DESC])
            ->all();
        foreach ($interactions as $interaction) {
            $ret[] = $interaction->toResponseArray($noMarkup);
        }
        return ['response' => $ret];
    }

    public function actionGet($id)
    {
        $ret = [];
        $noMarkup = isset($_GET['noMarkup']) ? boolval($_GET['noMarkup']) : false;
        $interaction = Interaction::findOne(['uid'=>$id]);
        $ret[] = $interaction->toResponseArray($noMarkup);

        return ['response' => $ret];
    }

    /**
     * @param $id
     * @return Interaction
     */
    protected function findModel($id)
    {
        $interaction = Interaction::findOne($id);
        if ($interaction === null) {
            throw new NotFoundHttpException('The requested interaction does not exist.');
        }
        return $interaction;
    }

    /**
     * @param $id
     * @return Interaction
     */
    protected function findModelByUID($uid)
    {
        $interaction = Interaction::findOne(['uid'=>$uid]);
        if ($interaction === null) {
            throw new NotFoundHttpException('The requested interaction does not exist.');
        }
        return $interaction;
    }
}
