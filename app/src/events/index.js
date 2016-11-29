var events = {};

events.WINDOW_RESIZE = 'window:resize';
events.ENABLED_SCROLL = 'scroll:enabled';
events.DISABLED_SCROLL = 'scroll:disabled';


events.DESIGNS_LOAD_COMPLETE = 'designs:load:complete';
events.DESIGNS_REFRESH = 'designs:refresh';
events.HOME_SCROLL = 'home:scroll';
events.TOGGLE_TOOLS = 'toggle:tools';

events.AUTH_CHANGE = 'auth:change';
events.REFRESH_AUTH = 'refresh:auth';

events.C_CHANGE_FRAME_COLOR = 'change:frame:color';
events.C_CHANGE_FRAME_RENDERING = 'change:frame:rendering';
events.C_CHANGE_ARM_COLOR = 'change:arm:color';
events.C_CHANGE_ARM_RENDERING = 'change:arm:rendering';

events.ADD_WISHLIST = 'add:wishlist';
events.REFRESH_WISHLIST = 'refresh:wishlist';
events.DELETE_WISHLIST = 'delete:wishlist';

events.CHANGE_LENSES = 'change:lenses';
events.CHANGE_CASE = 'change:case';

events.ORDER_CREATE = 'order:create';

export default events;
