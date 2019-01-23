export const updateNumeroQuestions = (num_questions_obj, tot_questions_obj) => {
    return {
        type: 'UPDATE_NUM_QUESTIONS',
        obj: num_questions_obj,
        tot_obj: tot_questions_obj
    }
}