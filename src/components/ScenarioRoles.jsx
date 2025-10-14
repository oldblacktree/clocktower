function ScenarioRoles({ roles }) {
  return (
    <div>
      <h4 className={`text-yellow-500  text-lg`}>Горожане</h4>
      <div className="grid grid-cols-4 gap-4 py-2">
        {roles
          .filter((item) => item.type === "townsfolk")
          .map((role) => {
            return (
              <div
                key={role.id}
                className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#23343b] border-transparent`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/assets/roles/${
                    role.id
                  }.png`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
      </div>
      <h4 className={`text-yellow-500 text-lg`}>Изгои</h4>
      <div className="grid grid-cols-4 gap-4 py-2">
        {roles
          .filter((item) => item.type === "outsider")
          .map((role) => {
            return (
              <div
                key={role.id}
                className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#23343b] border-transparent`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/assets/roles/${
                    role.id
                  }.png`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
      </div>
      <h4 className={`text-yellow-500  text-lg`}>Приспешники</h4>
      <div className="grid grid-cols-4 gap-4 py-2">
        {roles
          .filter((item) => item.type === "minion")
          .map((role) => {
            return (
              <div
                key={role.id}
                className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#23343b] border-transparent`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/assets/roles/${
                    role.id
                  }.png`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
      </div>
      <h4 className={`text-yellow-500  text-lg`}>Демоны</h4>
      <div className="grid grid-cols-4 gap-4 py-2">
        {roles
          .filter((item) => item.type === "demon")
          .map((role) => {
            return (
              <div
                key={role.id}
                className={`w-20 h-20 rounded-full overflow-hidden border-4 transition bg-[#23343b] border-transparent`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/assets/roles/${
                    role.id
                  }.png`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ScenarioRoles;
