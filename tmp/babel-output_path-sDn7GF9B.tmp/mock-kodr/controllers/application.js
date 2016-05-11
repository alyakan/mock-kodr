define('mock-kodr/controllers/application', ['exports', 'ember', 'ember-local-storage', 'moment', 'lodash/lodash'], function (exports, _ember, _emberLocalStorage, _moment, _lodashLodash) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    lineData: {},
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Challenges over the past week",
        // fill: false,
        // lineTension: 0.1,
        // backgroundColor: "rgba(75,192,192,0.4)",
        // borderColor: "rgba(75,192,192,1)",
        // borderCapStyle: 'butt',
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: 'miter',
        // pointBorderColor: "rgba(75,192,192,1)",
        // pointBackgroundColor: "#fff",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "rgba(75,192,192,1)",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        data: [3, 2, 4, 2, 4, 2, 2]
      }]
    },
    colours: [{
      fillColor: 'rgba(191, 101, 122, 0.8)'
    }],
    options: {
      responsive: true
      // showLines: false,
    },
    ready: false,
    'in': (function () {
      var d = new Date('5/1/2016');
      var current = new Date(Date.now());
      console.log((0, _moment['default'])((0, _moment['default'])(d).subtract(7, 'days').calendar()).format('dddd, MMM Do'));
      var lineData = this.get('data');
      var labels = [];
      var data = [];
      var that = this;

      this.store.query('activity', { subjectId: that.get('current_user.id'), verb: "completed" }).then(function (activities) {
        // Retrieve all date where a challenge was successfully completed
        var date;
        activities.map(function (activity) {
          /*
            Loop on each activity, group all challenges that were
            solved on the same day together 
           */
          date = new Date(activity.get('time'));
          date = (0, _moment['default'])(date).format('dddd, MMM Do').toString();

          if (!_lodashLodash['default'].includes(labels, date)) {
            labels.push(date);
            data.push(1);
          } else {
            data[labels.indexOf(date)] += 1;
          }
        });
        lineData.labels = labels;
        lineData.datasets.data = data;
        that.set('lineData', lineData);
        that.set('ready', true);
      });
    }).on('init'),
    actions: {
      session: _ember['default'].inject.service('session'),
      invalidateSession: function invalidateSession() {
        _ember['default'].$.ajax({
          type: 'DELETE',
          url: '/logout'
        });
        this.set('current_user', null);
        this.get('session').invalidate();
      }
    }
  });
});