define('mock-kodr/controllers/application', ['exports', 'ember', 'ember-local-storage', 'moment', 'lodash/lodash'], function (exports, _ember, _emberLocalStorage, _moment, _lodashLodash) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    current_user: (0, _emberLocalStorage.storageFor)('current_user'),
    lineData: {},
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Challenges successfully solved over the past week",
        fill: false,
        lineTension: 0,
        fillColor: "rgba(75,192,192,0.4)",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        datasetFill: false,
        data: [3, 2, 4, 2, 4, 2, 2]
      }]
    },
    doData: [{
      value: 2,
      color: "#D9E8E1",
      label: "Incomplete"
    }, {
      value: 8,
      color: "#50E862",
      label: "Conditionals"
    }],
    options: {
      responsive: true,
      bezierCurveTension: 0.1,
      datasetFill: false,
      angleLineWidth: 3,
      angleLineColor: "rgba(179,181,198,.5)",
      scaleBeginAtZero: true
      // showLines: false,
    },
    type: "Line",
    ready: false,
    'in': (function () {
      var current = new Date(Date.now());
      var da = (0, _moment['default'])((0, _moment['default'])(current).subtract(1, 'year').calendar()).format();
      var lineData = this.get('data');
      var labels = [];
      var data = [];
      var that = this;

      this.store.query('activity', { subjectId: that.get('current_user.id'), verb: "completed", time: { $gt: da } }).then(function (activities) {
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
      },
      changeType: function changeType() {

        if (this.get('type') === 'Bar') {
          console.log("ok");
          this.set('type', 'Line');
        } else {
          console.log("no");
          this.set('type', 'Bar');
        }
      },
      changeDate: function changeDate(period) {
        var lineData = this.get('data');
        var labels = [];
        var data = [];
        var that = this;
        var current = (0, _moment['default'])(new Date(Date.now()));
        var previous;
        switch (period) {
          case 'week':
            previous = (0, _moment['default'])(current.subtract(7, 'days').calendar()).format();
            break;
          case 'month':
            previous = (0, _moment['default'])(current.subtract(1, 'month').calendar()).format();
            break;
          case 'year':
            previous = (0, _moment['default'])(current.subtract(1, 'year').calendar()).format();
            break;
        }
        this.store.query('activity', { subjectId: that.get('current_user.id'), verb: "completed", time: { $gt: previous } }).then(function (activities) {
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
      }
    }
  });
});