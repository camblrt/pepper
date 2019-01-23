export const updateQuestions = (questions_obj) => {
    return {
        type: 'UPDATE_QUESTIONS',
        obj: questions_obj
    }
}

export const updateNumeroQuestions = (num_questions_obj) => {
    return {
        type: 'UPDATE_NUM_QUESTIONS',
        obj: num_questions_obj
    }
}

export const updateScores = (scores_obj) => {
    return {
        type: 'UPDATE_SCORES',
        obj: scores_obj
    }
}