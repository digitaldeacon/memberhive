export function MainMenu() {
  var _menu = [];

  this.$get = function() {
    return {
      getItems: function() {
        return _menu;
      }
    };
  };

  this.add = function(entry) {
    _menu.push(entry);
  };
}

/**
 * Abstract base class for sections and links
 *
 * @param {string} label The label for the menu item
 * @param {string} icon The FontAwesome icon name (omit the 'fa-' prefix)
 */
class MenuEntry {
  constructor(label, icon) {
    if (!label)
      throw 'label must not be empty';
    this.label = label;
    this.icon = icon;
  }
}

/**
 * Dropdown-Section with children
 *
 * @param {array} children List of `MenuLink` items
 */
export class MenuSection extends MenuEntry {
  constructor(label, icon, children) {
    if (children.length === 0)
      throw 'MenuSection must have at least one child';
    super(label, icon);
    this.children = children;
  }
}

/**
 * Menu link leading to a route
 *
 * @param {string} route The UI Route
 */
export class MenuLink extends MenuEntry {
  constructor(label, icon, route) {
    if (!route)
      throw 'route must not be empty';
    super(label, icon);
    this.route = route;
  }
}
