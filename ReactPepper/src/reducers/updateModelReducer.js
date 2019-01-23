const updateModelReducer = (state = { questionMap: {}, numQuestion: {}, scores: {}}, action) => {
    console.log(action.obj);
    switch (action.type) {
        case 'UPDATE_QUESTIONS':
            const newStateQuestions = { questionMap: action.obj, numQuestion: state.numQuestion, scores: state.scores };
        return newStateQuestions;
        case 'UPDATE_NUM_QUESTIONS':
            const newStateNumQuestions = { questionMap: state.questionMap, numQuestion: action.obj, scores: state.scores };
        return newStateNumQuestions;
        case 'UPDATE_SCORES':
            const newStateTimer = { questionMap: state.questionMap, numQuestion: state.numQuestion, scores:  action.obj};
        return newStateTimer;
        default:
        return state;
    }
}
export default updateModelReducer;