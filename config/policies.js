/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  /**
   * Las politicas solo se aplican a los CONTROLADORES o ACCIONES mas no a vistas
   * Las politicas se evaluan ANTES de ejecutar cada ACCION o CONTROLADOR
   */
  //  EN ESTA VERSION LAS POLITICAS NO SE APLICAN AUTOMÁTICAMENTE, REVISAR https://github.com/conceptainc/sails-hook-permissions/issues/1
  // 'administrador/*': 'esAdministrador', //deberia funcionar
  // '*': true,
};
