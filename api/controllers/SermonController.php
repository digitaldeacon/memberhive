<?php
namespace app\controllers;

use app\models\Sermon;

class SermonController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::class,
            'rules' => [
                [
                    'actions' => ['hit', 'group-list', 'create'],
                    'allow' => true,
                    'roles' => ['?'],
                ],
            ],
        ];
        return $behaviors;
    }

    /**
     * @param $id
     * @return array
     * old url: /sermon/hit/#SermonId UpdateDownloadCounterR GET
     */
    public function actionHit($id)
    {
        $sermon = $this->findModel($id);
        $sermon->hits++;
        $sermon->save();
        return ['reponse' => 'ok'];
    }

    /**
     * @param $groupId
     * @return array
     * old url: /sermons/json/#SermonsGroupId SermonsJsonListR GET
     */
    public function actionGroupList($groupId)
    {
        $sermons = Sermon::find()->where(['sermonGroupId' => $groupId]);
        return ['response' => $sermons->all()];
    }

    /**
     * old url: /api/sermons/insert SermonsInsertR POST
     */
    public function actionCreate()
    {
        $sermon = new Sermon();
        if ($sermon->load(\Yii::$app->request->post()) && $sermon->save()) {
            return ['response' => 'ok'];
        } else {
            throw new BadRequestHttpException($sermon->errors);
        }
    }



    /**
     * @param $id
     * @return Sermon
     */
    protected function findModel($id)
    {
        $sermon = Sermon::findOne($id);
        if ($sermon === null) {
            throw new NotFoundHttpException('The requested sermon does not exist.');
        }
        return $sermon;
    }
}
