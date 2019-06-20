/**
 * custom hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
/**Se usa un hook en esta aplicacion para:
 * Logging in to a remote API (segun la fuente)
 */
module.exports = function defineCustomHook(sails) {// toma como parámetro la instancia actual de Sails

  return {

    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: async function (done) {
      /**La initializecaracterística permite que un gancho realice tareas de inicio que pueden ser asíncronas o confiar en otros ganchos. Se garantiza que toda la configuración de Sails se completará antes de initializeque se ejecute la función de un gancho . Ejemplos de tareas que puede querer poner en initialize:
      Iniciar sesión en una API remota */
      sails.log.info('Initializing hook... (`api/hooks/custom`)');
      return done();
    },
    routes: {
      /**
       * La característica routes, permite a este hook enlazar facilmente nuevas rutas al cargar sails, al implementar 'routes' debe haber ya sea una clave 'after' o 'before' o ambas, Los valores de esas claves deben ser objetos cuyas claves son las direcciones de ruta
       */
      /**
       * Runs before every matching route.
       *
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        '/*': {
          skipAssets: true,
          fn: async function (req, res, next) {

            var url = require('url');

            // First, if this is a GET request (and thus potentially a view),
            // attach a couple of guaranteed locals.
            if (req.method === 'GET') {

              // The  `_environment` local lets us do a little workaround to make Vue.js
              // run in "production mode" without unnecessarily involving complexities
              // with webpack et al.)
              if (res.locals._environment !== undefined) {
                throw new Error('Cannot attach Sails environment as the view local `_environment`, because this view local already exists!  (Is it being attached somewhere else?)');
              }
              res.locals._environment = sails.config.environment;

              // The `me` local is set explicitly to `undefined` here just to avoid having to
              // do `typeof me !== 'undefined'` checks in our views/layouts/partials.
              // > Note that, depending on the request, this may or may not be set to the
              // > logged-in user record further below.
              if (res.locals.me !== undefined) {
                throw new Error('Cannot attach view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
              }
              res.locals.me = undefined;
            }//ﬁ

            // Next, if we're running in our actual "production" or "staging" Sails
            // environment, check if this is a GET request via some other subdomain,
            // for example something like `webhooks.` or `click.`.  If so, we'll
            // automatically go ahead and redirect to the corresponding path under
            // our base URL, which is environment-specific.
            // > Note that we DO NOT redirect virtual socket requests and we DO NOT
            // > redirect non-GET requests (because it can confuse some 3rd party
            // > platforms that send webhook requests.)
            var configuredBaseSubdomain;
            try {
              configuredBaseSubdomain = url.parse(sails.config.custom.baseUrl).host.match(/^([^\.]+)\./)[1];
            } catch (unusedErr) { /*…*/ }
            if ((sails.config.environment === 'staging' || sails.config.environment === 'production') && !req.isSocket && req.method === 'GET' && req.subdomains[0] !== configuredBaseSubdomain) {
              sails.log.info('Redirecting GET request from `' + req.subdomains[0] + '.` subdomain...');
              return res.redirect(sails.config.custom.baseUrl + req.url);
            }//•

            // No session? Proceed as usual.
            // (e.g. request for a static asset)
            if (!req.session) { return next(); }

            // Not logged in? Proceed as usual.
            if (!req.session.userId) { return next(); }

            // Otherwise, look up the logged-in user.
            //establecer el usuario de la session como loggedInUser
            var loggedInUser;
            loggedInUser = req.session.usuario;
            // if(req.session.tipoUsuario=='Admin'){
            //    // Otherwise, look up the logged-in user.
            //  loggedInUser = await Profesor.findOne({
            //   id: req.session.userId
            // });
            // }


            //BLOQUE COMENTADO
            // var loggedInUser = await User.findOne({
            //   id: req.session.userId
            // });
            //CIERRE BLOQUE COMENTADO

            // If the logged-in user has gone missing, log a warning,
            // wipe the user id from the requesting user agent's session,
            // and then send the "unauthorized" response.
            if (!loggedInUser) {
              sails.log.warn('Somehow, the user record for the logged-in user (`' + req.session.userId + '`) has gone missing....');
              delete req.session.userId;
              return res.unauthorized();
            }

            // Add additional information for convenience when building top-level navigation.
            // (i.e. whether to display "Dashboard", "My Account", etc.)
            if (!loggedInUser.password || loggedInUser.emailStatus === 'unconfirmed') {
              loggedInUser.dontDisplayAccountLinkInNav = true;
            }

            // Expose the user record as an extra property on the request object (`req.me`).
            // > Note that we make sure `req.me` doesn't already exist first.
            if (req.me !== undefined) {
              throw new Error('Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
            }
            req.me = loggedInUser;

            // If our "lastSeenAt" attribute for this user is at least a few seconds old, then set it
            // to the current timestamp.
            //
            // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)







            //BLOQUE COMENTADO
            // var MS_TO_BUFFER = 60 * 1000;
            // var now = Date.now();
            // if (loggedInUser.lastSeenAt < now - MS_TO_BUFFER) {
            //   User.update({ id: loggedInUser.id })
            //     .set({ lastSeenAt: now })
            //     .exec((err) => {
            //       if (err) {
            //         sails.log.error('Background task failed: Could not update user (`' + loggedInUser.id + '`) with a new `lastSeenAt` timestamp.  Error details: ' + err.stack);
            //         return;
            //       }//•
            //       sails.log.verbose('Updated the `lastSeenAt` timestamp for user `' + loggedInUser.id + '`.');
            //       // Nothing else to do here.
            //     });//_∏_  (Meanwhile...)
            // }//ﬁ
            //CIERRE BLOQUE COMENTADO

            // If this is a GET request, then also expose an extra view local (`<%= me %>`).
            // > Note that we make sure a local named `me` doesn't already exist first.
            // > Also note that we strip off any properties that correspond with protected attributes.
            if (req.method === 'GET') {
              if (res.locals.me !== undefined) {
                throw new Error('Cannot attach logged-in user as the view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
              }

              // Exclude any fields corresponding with attributes that have `protect: true`.
              //ESTA APLCACION NO CONTENDRA CAMPOS protect
              var sanitizedUser = _.extend({}, loggedInUser);
              //BLOQUE COMENTADO
              if(loggedInUser.administrador){ //contiene la propiedad administrador
                for (let attrName in Profesor.attributes) {
                  if (Profesor.attributes[attrName].protect) {
                    delete sanitizedUser[attrName];
                  }
                }//∞
              }
              else{
                for (let attrName in Estudiante.attributes) {
                  if (Estudiante.attributes[attrName].protect) {
                    delete sanitizedUser[attrName];
                  }
                }//∞
              }
              
              //CIERRE BLOQUE COMENTADO





              // If there is still a "password" in sanitized user data, then delete it just to be safe.
              // (But also log a warning so this isn't hopelessly confusing.)
              if (sanitizedUser.password) {
                sails.log.warn('The logged in user record has a `password` property, but it was still there after pruning off all properties that match `protect: true` attributes in the User model.  So, just to be safe, removing the `password` property anyway...');
                delete sanitizedUser.password;
              }//ﬁ

              res.locals.me = sanitizedUser;

              // Include information on the locals as to whether billing features
              // are enabled for this app, and whether email verification is required.
              res.locals.isBillingEnabled = sails.config.custom.enableBillingFeatures;
              res.locals.isEmailVerificationRequired = sails.config.custom.verifyEmailAddresses;

            }//ﬁ

            // Prevent the browser from caching logged-in users' pages.
            // (including w/ the Chrome back button)
            // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
            // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
            res.setHeader('Cache-Control', 'no-cache, no-store');

            return next();
          }
        }
      }
    }


  };

};
