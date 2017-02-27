<?php
namespace app\controllers;

use app\models\Note;
use app\models\NoteType;
use app\models\Person;
use app\models\PersonNote;
use yii\web\BadRequestHttpException;

class NoteController extends MHController
{
    private $noteType = 'person';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list','get','update','create-person','create-group','list-types','delete'],
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
        if ($action->id == 'create-person' ||
            $action->id == 'create-group' ||
            $action->id == 'delete') {
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
        if(!empty($post)) {
            $note = $this->findModel($post['id']);
            if($note->ownerId == $post['curuid']) {
                if(!$note->delete())
                    return ['response' => json_encode($note->errors)];
                return ['response' => true];
            }
        }
    }

    /**
     * url: /api/note/create-person or create-group note POST
     */
    private function actionCreate()
    {
        $note = new Note();
        $post = \Yii::$app->request->post();
        if (!empty($post)) {
            $transaction = Note::getDb()->beginTransaction();
            try {
                $note->text = $post['text'];
                $note->typeId = $post['type'];
                $note->ownerId = $post['ownerId'];
                $note->dueOn = isset($post['dueOn']) ? date('Y-m-d H:i',strtotime($post['dueOn'])) : null;
                $note->isPrivate = isset($post['isPrivate']) ? intval($post['isPrivate']) : 0;
                if($note->save()) {
                    if($this->noteType=='person') {
                        foreach ($post['recipients'] as $recipient) {
                            $junction = new PersonNote();
                            $junction->note_id = $note->id;
                            $junction->person_id = Person::findOne(['uid'=>$recipient])->id;
                            if(!$junction->save()) {
                                $transaction->rollBack();
                                throw new BadRequestHttpException(json_encode($junction->errors));
                            }
                        }
                    } elseif($this->noteType=='group') {
                        // new GroupNote();
                    }
                    $transaction->commit();
                } else {
                    throw new BadRequestHttpException(json_encode($note->errors));
                }
            } catch(\Exception $e) {
                $transaction->rollBack();
                throw new BadRequestHttpException($e->getMessage());
            } catch(\Throwable $e) {
                $transaction->rollBack();
                throw new BadRequestHttpException($e->getMessage());
            }
            return ['response' => $note->toResponseArray()];
        } else {
            throw new BadRequestHttpException($note->errors);
        }
    }

    public function actionCreatePerson()
    {
        $this->noteType = 'person';
        return $this->actionCreate();
    }

    public function actionCreateGroup()
    {
        $this->noteType = 'group';
        return $this->actionCreate();
    }

    public function actionListTypes()
    {
        $ret = [];
        foreach(NoteType::find()->each() as $type) {
            $ret[] = $type->toResponseArray();
        }
        return ['response' => $ret];
    }

    public function actionList($id)
    {
        $ret = [];
        $person = Person::find()
            ->with([
                'notes' => function($q) {
                    $q->orderBy(['created_at'=>SORT_DESC]);
                }]
            )
            ->where(['uid'=>$id])
            ->orderBy(['created_at'=>SORT_DESC])
            ->all();
        foreach($person[0]->notes as $note) {
            $ret[] = $note->toResponseArray();
        }
        return ['response' => $ret];
    }

    /**
     * @param $id
     * @return Note
     */
    protected function findModel($id)
    {
        $note = Note::findOne($id);
        if ($note === null)
            throw new NotFoundHttpException('The requested note does not exist.');
        return $note;
    }

}