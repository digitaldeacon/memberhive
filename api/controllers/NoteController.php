<?php
namespace app\controllers;

use app\models\Note;
use app\models\NoteType;

class NoteController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list','get','update','create','list-types'],
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
        if ($action->id == 'create') {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

    /**
     * old url: /api/sermons/insert SermonsInsertR POST
     */
    public function actionCreate()
    {
        $note = new Note();
        $post = \Yii::$app->request->post();
        if ($post) {
            $note->text = $post['text'];
            $note->typeId = $post['type'];
            $note->ownerId = $post['ownerId'];
            if(!$note->save()) {
                return ['response' => json_encode($note->errors)];
            }
            return ['response' => $note->toResponseArray()];
        } else {
            throw new BadRequestHttpException($note->errors);
        }
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
        foreach(Note::find()->where(['ownerId'=>$id])->orderBy(['created_at'=>SORT_DESC])->each() as $note) {
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