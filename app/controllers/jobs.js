/*
GET    /jobs        #=> index
GET    /jobs/1      #=> show
GET    /jobs/new    #=> new
GET    /jobs/1/edit #=> edit
PUT    /jobs/1      #=> update
POST   /jobs        #=> create
DELETE /jobs/1      #=> destroy
*/

exports.index = function(req, res){
  res.send('forum index');
};

exports.new = function(req, res){
  res.send('new forum');
};

exports.create = function(req, res){
  res.send('create forum');
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.job);
};

exports.edit = function(req, res){
  res.send('edit forum ' + req.params.job);
};

exports.update = function(req, res){
  res.send('update forum ' + req.params.job);
};

exports.destroy = function(req, res){
  res.send('destroy forum ' + req.params.job);
};

exports.Jobs = { get: function(id, fn) {
  process.nextTick(function(){
    fn(null, { title: 'Ferrets' });
  });
}};