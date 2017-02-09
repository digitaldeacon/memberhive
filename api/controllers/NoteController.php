<?php
namespace app\controllers;

use app\models\Note;

class NoteController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list','get','update','create'],
                    'allow' => true,
                    'roles' => ['?'],
                ],
            ],
        ];
        return $behaviors;
    }

    /**
     * old url: /api/sermons/insert SermonsInsertR POST
     */
    public function actionCreate()
    {
        $note = new Note();
        if ($note->load(\Yii::$app->request->post()) && $note->save()) {
            return ['response' => 'ok'];
        } else {
            throw new BadRequestHttpException($note->errors);
        }
    }

    public function actionList($personId)
    {
        if(!isset($personId) || empty($personId))
            throw new BadRequestHttpException('Person ID cannot be empty');

        $ret = [];
        foreach(Note::find()->where(['ownerId'=>$personId])->each() as $note) {
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