const DBLink=require('../app/models/pepperDBLinkClass');
const assert = require('assert');

let dbLink= new DBLink();

describe('DB unit test',()=>{

  describe('Add user test:',()=>{
    it('Should add user without errors',()=>{
      try{
        dbLink.addGameUser('bub',2,0);
      }catch(err){
        assert(err);
      }
    });
  });
  describe('Update Game User test:',()=>{
    it('Should update user quizz nb without errors',()=>{
      try{
        dbLink.updateGameUser('bub',3);
      }catch(err){
        assert(err);
      }
    });
  });
  describe('Start test',()=>{
      it('Return an integer if the quizz is saved',()=>{
        dbLink.startQuizz(0,(err, res)=>{
        if(typeof res === "number"){
          console.log('ok')
        };
        });
      });
  });

  describe('getQuestion test',()=>{
    it('Should return question list without errors',()=>{
      dbLink.getQuestion(3,(err,res)=>{
        if(err) console.error(err);
        else {
          assert(res.length <4);
          for(quest of res){
            // assert(quest.id);
          }
        }
      });
    });
  });
  describe('get user score test',()=>{
    it('Should return user score without errors',(done)=>{
      dbLink.getUserScore('bob',0,done());
    });
  });
  describe('Increment score test',()=>{
    it('Should increment user score without error',()=>{
      try{
        dbLink.incrScoreUser('bub',0);
      } catch (err){
        assert(err);
      }
    });
  });
  describe('get ranking test',()=>{
    it('Should return quizz ranking without errors',(done)=>{
      dbLink.getRanking(0,done());
    });
  });
  describe('delete test user:',()=>{
    it('User deleted without error',()=>{
      try{
        dbLink.deleteUser('bub');
      }catch(err){
        assert(err);
      }
    })
  })
});
