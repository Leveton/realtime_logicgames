$(function(){

  window.Puzzle = Backbone.Model.extend({

    defaults: function() {
      return {
        user_id: '64',
        title: 'Russian Dolls',
        time_spent: 'ok',
        attempts: '2',
        hint_used: '0',
        score: '100', //attempts divided by time_used??
        done: '1'
      };
    }

  });

  window.PuzzleList = Backbone.Collection.extend({
    model: Puzzle,
    url: '/puzzles'
    //additions for node system below
    // PuzzleList.on("add", function(puzzle){
    //   console.log('puzzle completed' + puzzle.get('title'));
    // });
  });


  window.Puzzles = new PuzzleList;

  window.PuzzleView = Backbone.View.extend({

});

  window.AppView = Backbone.View.extend({

});

  window.App = new AppView;

});

function makePuzzle(){
        Puzzles.create({title:'Quarterback3', latency:user_data, attempts:attempts, resets:resets, done:true, user_id:'<%= current_user %>'});
}
