const updateModelReducer = (state = { numQuestion: {}, totalQuestions: {}}, action) => {
    switch (action.type) {
        case 'UPDATE_NUM_QUESTIONS':
            const newStateNumQuestions = { numQuestion: action.obj, totalQuestions: action.tot_obj };
        return newStateNumQuestions;
        default:
        return state;
    }
}
export default updateModelReducer;