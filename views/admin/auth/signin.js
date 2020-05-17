const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors  }) => {
  return layout ({ content :
    `<div>
      <form method="POST">
        <input name="email" placeholder="email" />
        ${getError(errors, 'email')}
        <input name="pass" placeholder="password" />
        ${getError(errors, 'pass')}
        <button>Sign in</button>
      </form>
    </div>`
  })
};
