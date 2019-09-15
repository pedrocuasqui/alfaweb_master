module.exports = {


  friendlyName: 'View homepage',


  description: 'Display "" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/homepage'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
