<?php
namespace app\enums;

class Permission extends Enum
{
    const LOGIN = 'login';

    const EDIT_MEMBERS = 'editMembers';
    const EDIT_ADMINS = 'editAdmins';
    const EDIT_STAFF = 'editStaff';

    const CREATE_MEMBERS = 'createMembers';
    const CREATE_ADMINS = 'createAdmins';
    const CREATE_STAFF = 'createStaff';

    const DELETE_MEMBERS = 'deleteMembers';
    const DELETE_ADMINS = 'deleteAdmins';
    const DELETE_STAFF = 'deleteStaff';

    const CREATE_INTERACTIONS = 'createInteractions';
    const DELETE_INTERACTIONS = 'deleteInteractions';
    const VIEW_INTERACTIONS = 'viewInteractions';
    const VIEW_PRIVATE_INTERACTIONS = 'viewPrivateInteractions';
    const EDIT_INTERACTIONS = 'editInteractions';

    const VIEW_SYS_SETTINGS = 'viewSysSettings';
    const EDIT_SYS_SETTINGS = 'editSysSettings';
}
