
/* Amplify Params - DO NOT EDIT
	API_TICTACTOC_GRAPHQLAPIENDPOINTOUTPUT
	API_TICTACTOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
   console.log(event);
   return {
    id: "12121212",
    status: "REQUESTED",
    turn: "Test",
    state: ["x", "o", null, null, null, null, null, null, null],
    winner: "test",
}
};
