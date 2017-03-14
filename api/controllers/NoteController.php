<?php
namespace app\controllers;

use app\models\Note;
use app\models\NoteType;
use app\models\Person;
use app\models\PersonNote;
use yii\web\BadRequestHttpException;

class NoteController extends MHController
{
    public $noteType = 'person';

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
        if (!empty($post)) {
            $note = $this->findModel($post['id']);
            if ($note->authorId == $post['author']) {
                if (!$note->delete()) {
                    return ['response' => json_encode($note->errors)];
                }
                return ['response' => true];
            } else {
                throw new BadRequestHttpException('This is not yours to delete!');
            }
        }
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * url: /api/note/create-person or create-group note POST
     */
    private function actionCreate()
    {
        $post = \Yii::$app->request->post();
        $note = new Note();
        $insert = true;

        if (!empty($post)) {
            // throw new BadRequestHttpException(json_encode($post));
            if (isset($post['uid'])) {
                $note = $this->findModelByUID($post['uid']);
                $insert = empty($note);
            }

            $transaction = Note::getDb()->beginTransaction();
            try {
                $note->text = $post['text'];
                $note->typeId = intval($post['type']);
                $note->ownerId = $post['owner'];
                $note->authorId = $post['authorId'];
                $note->dueOn = isset($post['dueOn']) ? date('Y-m-d H:i', strtotime($post['dueOn'])) : null;
                $note->isPrivate = isset($post['isPrivate']) ? intval($post['isPrivate']) : 0;
                if ($note->save()) {
                    if ($this->noteType == 'person') {
                        if (!$insert && $note->id) {
                            PersonNote::deleteAll(['note_id'=>$note->id]);
                        }
                        foreach ($post['recipients'] as $recipient) {
                            $junction = new PersonNote();
                            $junction->note_id = $note->id;
                            $junction->person_id = Person::findOne(['uid'=>$recipient])->id;
                            if (!$junction->save()) {
                                $transaction->rollBack();
                                throw new BadRequestHttpException(json_encode($junction->errors));
                            }
                        }
                    } elseif ($this->noteType == 'group') {
                        // new GroupNote();
                    }
                    $transaction->commit();
                    return ['response' => $note->toResponseArray()];
                } else {
                    throw new BadRequestHttpException(json_encode($note->errors));
                }
            } catch (\Exception $e) {
                $transaction->rollBack();
                throw new BadRequestHttpException(json_encode($note));
            } catch (\Throwable $e) {
                $transaction->rollBack();
                throw new BadRequestHttpException(json_encode($note->errors));
            }
            return ['response' => $note->toResponseArray()];
        } else {
            throw new BadRequestHttpException('No valid data was received');
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
        foreach (NoteType::find()->each() as $type) {
            $ret[] = $type->toResponseArray();
        }
        return ['response' => $ret];
    }

    public function actionList($id)
    {
        $ret = [];
        $noMarkup = isset($_GET['noMarkup']) ? boolval($_GET['noMarkup']) : true;
        $notes = Note::find()
            ->where(['ownerId' => $id])
            ->with('recipients', 'author')
            ->orderBy(['updated_at'=>SORT_DESC])
            ->all();
        foreach ($notes as $note) {
            $ret[] = $note->toResponseArray($noMarkup);
        }
        return ['response' => $ret];
    }

    public function actionGet($id)
    {
        $ret = [];
        $noMarkup = isset($_GET['noMarkup']) ? boolval($_GET['noMarkup']) : false;
        $note = Note::findOne(['uid'=>$id]);
        $ret[] = $note->toResponseArray($noMarkup);

        return ['response' => $ret];
    }

    /**
     * @param $id
     * @return Note
     */
    protected function findModel($id)
    {
        $note = Note::findOne($id);
        if ($note === null) {
            throw new NotFoundHttpException('The requested note does not exist.');
        }
        return $note;
    }

    /**
     * @param $id
     * @return Note
     */
    protected function findModelByUID($uid)
    {
        $note = Note::findOne(['uid'=>$uid]);
        if ($note === null) {
            throw new NotFoundHttpException('The requested note does not exist.');
        }
        return $note;
    }
}
