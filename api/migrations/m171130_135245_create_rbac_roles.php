<?php

use yii\db\Migration;
use app\enums\Permission;

/**
 * Class m171130_135245_create_rbac_roles
 */
class m171130_135245_create_rbac_roles extends Migration
{
    public function up()
    {
        $auth = Yii::$app->authManager;
        if ($auth->getRole('member')) {
            return;
        }

        $login = $auth->createPermission(Permission::LOGIN);
        $login->description = 'Allow a user to login';
        $auth->add($login);

        // ADMINS
        $createAdmins = $auth->createPermission(Permission::CREATE_ADMINS);
        $createAdmins->description = 'Allow to create administrators';
        $auth->add($createAdmins);

        $editAdmins = $auth->createPermission(Permission::EDIT_ADMINS);
        $editAdmins->description = 'Allow to edit administrators' .
        $auth->add($editAdmins);

        $deleteAdmins = $auth->createPermission(Permission::DELETE_ADMINS);
        $deleteAdmins->description = 'Allow to delete administrators' .
        $auth->add($deleteAdmins);

        // MEMBERS
        $createMembers = $auth->createPermission(Permission::CREATE_MEMBERS);
        $createMembers->description = 'Allow to create other members' .
        $auth->add($createMembers);

        $editMembers = $auth->createPermission(Permission::EDIT_MEMBERS);
        $editMembers->description = 'Allow to edit other members' .
        $auth->add($editMembers);

        $deleteMembers = $auth->createPermission(Permission::DELETE_MEMBERS);
        $deleteMembers->description = 'Allow to delete other members' .
        $auth->add($deleteMembers);

        // STAFF
        $createStaff = $auth->createPermission(Permission::CREATE_STAFF);
        $createStaff->description = 'Allow to create staff members' .
        $auth->add($createStaff);

        $editStaff = $auth->createPermission(Permission::EDIT_STAFF);
        $editStaff->description = 'Allow to create staff members' .
        $auth->add($editStaff);

        $deleteStaff = $auth->createPermission(Permission::DELETE_STAFF);
        $deleteStaff->description = 'Allow to delete other staff members' .
        $auth->add($deleteStaff);

        // SETTINGS
        $editSysSettings = $auth->createPermission(Permission::EDIT_SYS_SETTINGS);
        $editSysSettings->description = 'Allow to edit system settings' .
        $auth->add($editSysSettings);

        $viewSysSettings = $auth->createPermission(Permission::VIEW_SYS_SETTINGS);
        $viewSysSettings->description = 'Allow to view system settings' .
        $auth->add($viewSysSettings);

        // INTERACTIONS
        $createInteractions = $auth->createPermission(Permission::CREATE_INTERACTIONS);
        $createInteractions->description = 'Allow to create interactions' .
        $auth->add($createInteractions);

        $deleteInteractions = $auth->createPermission(Permission::DELETE_INTERACTIONS);
        $deleteInteractions->description = 'Allow to delete interactions' .
        $auth->add($deleteInteractions);

        $editInteractions = $auth->createPermission(Permission::EDIT_INTERACTIONS);
        $editInteractions->description = 'Allow to edit any interaction' .
        $auth->add($editInteractions);

        $viewInteractions = $auth->createPermission(Permission::VIEW_INTERACTIONS);
        $viewInteractions->description = 'Allow to view any interaction' .
        $auth->add($viewInteractions);

        $viewPrivateInteractions = $auth->createPermission(Permission::VIEW_PRIVATE_INTERACTIONS);
        $viewPrivateInteractions->description = 'Allow to view private interactions' .
        $auth->add($viewPrivateInteractions);

        $admin = $auth->createRole('admin');
        $auth->add($admin);
        $auth->addChild($admin, $login);
        $auth->addChild($admin, $createAdmins);
        $auth->addChild($admin, $deleteAdmins);
        $auth->addChild($admin, $editAdmins);
        $auth->addChild($admin, $createMembers);
        $auth->addChild($admin, $deleteMembers);
        $auth->addChild($admin, $editMembers);
        $auth->addChild($admin, $createStaff);
        $auth->addChild($admin, $editStaff);
        $auth->addChild($admin, $deleteStaff);
        $auth->addChild($admin, $createInteractions);
        $auth->addChild($admin, $editInteractions);
        $auth->addChild($admin, $deleteInteractions);
        $auth->addChild($admin, $viewPrivateInteractions);
        $auth->addChild($admin, $viewSysSettings);
        $auth->addChild($admin, $editSysSettings);

        $staff = $auth->createRole('staff');
        $auth->add($staff);
        $auth->addChild($staff, $login);
        $auth->addChild($staff, $createAdmins);
        $auth->addChild($staff, $editAdmins);
        $auth->addChild($staff, $createMembers);
        $auth->addChild($staff, $deleteMembers);
        $auth->addChild($staff, $editMembers);
        $auth->addChild($staff, $createStaff);
        $auth->addChild($staff, $editStaff);
        $auth->addChild($staff, $deleteStaff);
        $auth->addChild($staff, $createInteractions);
        $auth->addChild($staff, $editInteractions);
        $auth->addChild($staff, $deleteInteractions);
        $auth->addChild($staff, $viewSysSettings);

        $member = $auth->createRole('member');
        $auth->add($member);
        $auth->addChild($member, $login);
        $auth->addChild($member, $viewInteractions);
    }

    public function down()
    {
        Yii::$app->authManager->removeAll();
    }
    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }
    public function safeDown()
    {
    }
    */
}
