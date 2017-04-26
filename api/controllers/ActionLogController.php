<?php
namespace app\controllers;

use app\models\ActionLog;
use yii\web\BadRequestHttpException;

class ActionLogController extends MHController
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    public function actionList($id)
    {
        $ret = [];
        if (!isset($_GET['context']) || empty($_GET['context'])) {
            throw new BadRequestHttpException('Your call is missing a context');
        }
        $context = trim($_GET['context']);

        if ($context == 'person') {
            $logs = ActionLog::find()
                // ->with(['person'])
                ->where(['refId'=>$id])
                ->orderBy(['created_at'=>SORT_DESC])
                ->all();
            foreach ($logs as $log) {
                $ret[] = $log->toResponseArray();
            }
        }
        return ['response' => $ret];
    }

    /**
     * @param $id
     * @return ActionLog
     */
    protected function findModel($id)
    {
        $log = ActionLog::findOne($id);
        if ($log === null) {
            throw new NotFoundHttpException('The requested note does not exist.');
        }
        return $log;
    }
}
