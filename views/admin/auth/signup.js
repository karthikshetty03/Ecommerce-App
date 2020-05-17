const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ req, errors }) => {
  //console.log(errors);
  return layout({
    content: `<div>
      Your id is ${req.session.userId}
      <form method = "POST">
         <input name = "email" placeholder="email"/>
         ${getError(errors, "email")}
         <input name = "pass" placeholder="password"/>
          ${getError(errors, "pass")}
         <input name = "passconf" placeholder="password confirmation"/>
          ${getError(errors, "passconf")}
         <button>Sign up</button>
      </form>
      <div>`,
  });
};
