var express = require('express');
var redis = require("redis"),
        client = redis.createClient();

var app = express();

app.configure(function(){
  app.use(express.logger());
  app.use(express.static(__dirname + '/'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.disable('view cache');
  app.use(express.cookieParser());
 });

app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
        });
        //client.quit();
    });

app.post('/puzzles', function(req, res){
  console.log(req.body.user_id);
  user_temp = req.body.user_id;
  client.hset("hash key3", "hashtest 4", user_temp, redis.print);
});

app.get('/', function(req, res){
  //client.hset("hash key2", "hashtest 3", "mike", redis.print);
  client.hget("hash key", "hashtest 1", function(err, reply){
    puzzle_result = reply;
    res.render('game0.html', {current_user:puzzle_result});
  });
});

app.get('/game0', function(req, res){
  client.get("string key", function(err, reply){
    puzzle_result = reply;
    res.render('game0.html', {current_user:puzzle_result});
  });
});

app.get('/show_results', function(req, res){
  client.hset("hash key2", "hashtest 3", "mike", redis.print);
  client.hget("hash key3", "hashtest 4", function(err, reply){
    puzzle_result = reply;
    res.render('show_results.html', {current_user2:puzzle_result});
  });
});

var port = process.env.PORT || 4000;
app.listen(port);

// def get_puzzle_times(title, user_index)
//     latency_convert=Puzzle.find_by_user_id_and_title(self.id, title)
//     latency = latency_convert.latency
//     latency_split = latency.split('-')
//     latency_split.slice!(0..3)
//     latency_split[user_index]
// end

// def get_puzzle_attempts(title, user_index)
//   attempt_array = Puzzle.find_by_user_id_and_title(self.id, title)
//   attempt = attempt_array.attempts
//   attempt_split = attempt.split('-')
//   attempt_split.slice!(0..3)
//   attempt_split[user_index]
// end

// def get_puzzle_resets(title, user_index)
//   reset_array = Puzzle.find_by_user_id_and_title(self.id, title)
//   reset = reset_array.resets
//   reset_split = reset.split('-')
//   reset_split.slice!(0..3)
//   reset_split[user_index]
// end

// def saved_check(title)
//    Puzzle.where(:user_id => self.id, :title => title)
//    #@titles
// end