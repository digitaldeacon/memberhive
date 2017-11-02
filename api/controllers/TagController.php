<?php
namespace app\controllers;

use app\models\Tag;
use yii\web\BadRequestHttpException;

class TagController extends MHController
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
                        'get',
                        'update',
                        'save-person',
                        'save-group',
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
            'save-person',
            'save-group',
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
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    /**
     * url: /api/interaction/create-person or create-group interaction POST
     */
    private function actionSave()
    {
        $post = \Yii::$app->request->post();
        $tag = new Tag();
        $insert = true;

        if (!empty($post)) {
            if (isset($post['uid'])) {
                $tag = $this->findModelById($post['id']);
                $insert = empty($tag);
            }

            return $tag->toResponseArray();
        } else {
            throw new BadRequestHttpException('No valid data was received');
        }
    }

    public function actionList($id = 0)
    {
        $ret = [];
        $tags = Tag::find()
            ->orderBy(['text' => SORT_ASC])
            ->all();

        foreach ($tags as $tag) {
            $ret[] = $tag->toResponseArray();
        }
        return $ret;
    }

    /**
     * @param $id
     * @return Tag
     */
    protected function findModel($id)
    {
        $tag = Tag::findOne($id);
        if ($tag === null) {
            throw new NotFoundHttpException('The requested tag does not exist.');
        }
        return $tag;
    }
}
