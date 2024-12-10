// const gameObject = {
//   id: "gameObject",
//   gameVersion: "0.0.1",
//   title: "Game Object",
//   description: "This is a game object",
//   players: [
//     { id: "player1", name: "Player 1" },
//     { id: "player2", name: "Player 2" },
//   ],
//   save: {
//     version: "0.0.1",
//     date: "2022-06-01",
//     changes: [
//       {
//         version: "0.0.1",
//         date: "2022-06-01",
//         changes: [
//           {
//             type: "added",
//             name: "Game Object",
//             description: "This is a game object",
//           },
//         ],
//       },
//     ],
//   },
// };

const UserProfile = (function () {
  let full_name = "";

  const getName = function () {
    return full_name; // Or pull this from cookie/localStorage
  };

  const setName = function (name: string) {
    full_name = name;
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName,
  };
})();

export default UserProfile;
