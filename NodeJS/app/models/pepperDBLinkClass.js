"use strict";

const { Pool } = require('pg');
const connectionString ='postgres://qboelewpqombty:4982d31bf9ddd0b2de4fe165ac4d14819ee6a80521b2973c1ce52d647eb83ccc@ec2-54-75-245-94.eu-west-1.compute.amazonaws.com:5432/dbmq9a4rjnqseg';


module.exports = class pepperDBLinkClass{

  constructor(){
     this.pool = new Pool({
       connectionString: connectionString,
       ssl: true,
     });
  }

  closeDBconnection(){
    console.log("déconnexion du pool");
    this.pool.end();
  }

   addGameUser(userName, type,jeu){
    const addGameUserQuery = {
      text:'SELECT * from "pepperSchema".createuserjeu($1,$2,$3)',
      values:[userName,type,jeu]
    };
    this.pool.connect((err,client,release)=>{
      client.query(addGameUserQuery, (err,res)=>{
          if (err) console.log(err.stack);
          else {
            console.log("Joueur ajouté");
            client.end();
          }
      } );
    });
  }
  updateGameUser(userName, type,jeu){
    const updateGameUserQuery = {
      text:'SELECT * from "pepperSchema".updateuserjeu($1,$2,$3)',
      values:[userName,type,jeu]
    };
    this.pool.connect((err,client,release)=>{
      client.query(updateGameUserQuery, (err,res)=>{
          if (err) console.log(err.stack);
          else {
            console.log("Joueur ajouté");
            client.end();
          }
      } );
    });
  }


  addQuestion(questionJSON){
    const addQuestionQuery = {
      text:'SELECT * from "pepperSchema".addquestion($1, $2, $3, $4, $5, $6, $7);',
      values:[questionJSON.question, questionJSON.answer1,  questionJSON.answer2,  questionJSON.answer3, questionJSON.answer4, questionJSON.goodAnswer, questionJSON.why],
    };
    this.pool.connect((err,client,release)=>{
      client.query(addQuestionQuery, (err, res)=>{
          if (err) console.error('error: '+err.stack);
          else {
            console.log('Question et reponses ajoutées à la DB');
            client.end();
          }
      });
    });
  }



  getQuestion(nbQuestion,cb){
    this.pool.connect((err,client,release)=>{
      let questionIds=[];
      while(questionIds.length < nbQuestion){
        let rand=Math.floor(Math.random()*15)+1;
        if( questionIds.indexOf(rand)===-1){
          questionIds.push(rand);
        }
      }
      const getQuestionQuery = {
          text: 'SELECT * from "pepperSchema".getquestionreponse($1,$2);',
          values:[nbQuestion,questionIds],
      };
      let questions={id:'questions'};
      client.query(getQuestionQuery,(err,res)=>{
        if(err) console.error(err);
        else {
          let cptrR=1;
          let cptrQ=1;
          let lastQid=0;
          let user={};
          for(let row of res.rows){
            if(lastQid == 0){
              lastQid=row.questionid;
              user.id=lastQid;
              user.question=row.intituleQ;
              user.answer1=row.intituleR;
              if(row.goodanswer){
                user.goodanswer="answer1";
              }
            }
            if(row.questionid ==lastQid ){
              if(cptrR==2){
                user.answer2=row.intituleR;
                if(row.goodanswer){
                  user.goodanswer="answer2";
                }
              }
              if(cptrR==3){
                user.answer3=row.intituleR;
                if(row.goodanswer){
                  user.goodanswer="answer3";
                }
              }
              if(cptrR==4){
                lastQid=0;
                user.answer4=row.intituleR;
                if(row.goodanswer){
                  user.goodanswer="answer4";
                }
                questions[cptrQ]=user;
                user={};
                cptrR=0;
                cptrQ++;
              }
              cptrR++;
            }

          }
          client.end();
          return cb(null,questions);
        }
      });
    });
  }

  startLog(){
    this.pool.connect((err,client,release)=>{
      client.query('select * from "pepperSchema".startLog()',(res,err)=>{
        if(err) console.log(err.stack);
        else {
          console.log("Date mise en marche de Pepper enregistree.");
          client.end();
        }
        });
      });
  }

  endLog(){
    this.pool.connect((err,client,release)=>{
      client.query('select "pepperSchema".endLog()',(res,err)=>{
        if(err) console.log(err.stack);
        else {
          console.log("Date arret de Pepper enregistree.")
          client.end();
        }
      });
    });
  }

  danceLog(){
    this.pool.connect((err,client,release)=>{
        client.query('select "pepperSchema".danceLog()',(res,err)=>{
          if(err) console.log(err.stack);
          else {
            console.log("Date danse de Pepper enregistree.");
            client.end();
          }
        });
    });
  }

  startQuizz(inputCode, cb){
    this.pool.connect((err,client,release)=>{
      client.query('select "pepperSchema".startQuizz($1)',[inputCode],(res,err)=>{
        if(err) console.log(err.stack);
        else{
           console.log("Date lancement d'un quizz (inputCode: "+inputCode+") enregistree.")
           client.end();
           return cb(null,res);
         }
      });
    });
  }

  presentationLog(){
    this.pool.connect((err,client,release)=>{
      client.query('select "pepperSchema".presentationLog()',(res,err)=>{
        if(err) console.log(err.stack);
        else{
          console.log("Date lancement d'une presentation enregistree.");
          client.end();
        }
    });
  });
  }

  incrScoreUser(userName,quizzNb){
    const setScoreQuery={
      text:'select * from "pepperSchema".incrscore($1,$2);',
      values:[userName,quizzNb],
    }
    this.pool.connect((err,client,release)=>{
      client.query(setScoreQuery,(err,res)=>{
        if(err) throw err;
        else{
          client.end();
        }
      });
    });
  }

  getRanking(quizzNb,cb){
    const getRankingQuery={
      text:'select * from "pepperSchema".getranking($1);',
      values:[quizzNb],
    };
    this.pool.connect((err,client,release)=>{
      client.query(getRankingQuery,(err,res)=>{
        if(err) throw err;
        else{
          let ranking={id:"ranking"}
          let cptrUser=1;
          for(let row of res.rows){
            let user={userName:row.username};
            user.score=row.score;
            ranking[cptrUser]=user;
            cptrUser++;
          }
          console.log(ranking);
          client.end();
          return cb(null,ranking);
        }
      });
    });
  }

  getUserScore(userName,quizzNb,cb){
    const getRankingQuery={
      text:'select * from "pepperSchema".getranking($1);',
      values:[quizzNb],
    }
    this.pool.connect((err,client,release)=>{
      client.query(getRankingQuery,(err,res)=>{
        let user = {};
        if(err) throw err;
        else{
          let cptrUser=1;
          for(let row of res.rows){
            if(userName==row.username){
              user={userName:row.username};
              user.score=row.score;
              user.rank=cptrUser;
            }
            cptrUser++;
          }
          console.log(user);
          client.end();
          return cb(null,user);
        }
      });
    });
  }
};
