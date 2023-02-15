<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u989707743_rando' );

/** Database username */
define( 'DB_USER', 'u989707743_Rando' );

/** Database password */
define( 'DB_PASSWORD', 'qhujznD8*rando' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '#v+ qG8Xp&+Yi~L>WDEp&S_6n&XB[v#oO@n|ggifHDp!])DCBsyTutfW=TR8#.{#' );
define( 'SECURE_AUTH_KEY',   '!?=>PK]+1B9GlLAS$&DF0cuL!.tp,wYi2/e&5E^di)DR7;T.B1m:*%oS`:tvgJ[7' );
define( 'LOGGED_IN_KEY',     'kquHboo3PPr2C/|XG:ybX>n92*Z6k+B>v>%G02(`9n#;W8{krh-h[#2;^zHnRPRK' );
define( 'NONCE_KEY',         'T]ueSx{vyN6KI8c)Xh|r&Jw4xAkt428H6pNB}/Mi+=?p-)fJANj)rt`Zm.RCWU]O' );
define( 'AUTH_SALT',         'O4C$F2Deu4zHup:pBJQ`TtH*v?9Yl`O%+!cc#p6-E-gQYCF[&9W,;<O&.IL[N!xC' );
define( 'SECURE_AUTH_SALT',  '!~D23WypJJut8)TV1`!ur(YF-=V):.6Ts~PG3CM8$KNbfx=lt0/rqxM^c(xs,EKK' );
define( 'LOGGED_IN_SALT',    'TlxFY459|u_2&8+fzMfQSVXN=o!9TLh#c@CojsJhc7;[=0v{KuHeG[ixx}$p-JDI' );
define( 'NONCE_SALT',        '8f,Akv?;H?qzz &Njc%#?LT%dbp>>{`mK@FTH:F!6D.xCG.^_,NAsF9;;&d&GG#7' );
define( 'WP_CACHE_KEY_SALT', '| `QkQd>vk@a#@q^Xi&-|~.Bn84i6lGE@vCkqeT|?ZN2j6wfUNfM0UU[))RC=UoS' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );


/* Add any custom values between this line and the "stop editing" line. */



define( 'FS_METHOD', 'direct' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
