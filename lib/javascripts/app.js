(function() {
  var calc_state, evolution, frequencies, neighbours, print_world, run_life, survives;
  evolution = function(world) {
    var f, list, result, survivors;
    list = [];
    _.each(world, function(cell) {
      return _.each(neighbours(cell), function(neigh) {
        return list.push(neigh);
      });
    });
    f = frequencies(list);
    result = [];
    survivors = _.each(f, function(count, cell) {
      if (survives(_.include(world, cell), count)) {
        return result.push(cell);
      }
    });
    return result;
  };
  survives = function(state, n) {
    return state && _.include([2, 3], n) || (!state && n === 3);
  };
  neighbours = function(cell) {
    var x, y, _ref;
    _ref = _.map(cell.split(','), function(v) {
      return parseInt(v);
    }), x = _ref[0], y = _ref[1];
    return _.map([[x - 1, y + 1], [x, y + 1], [x + 1, y + 1], [x - 1, y], [x + 1, y], [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]], function(c) {
      return c.join(',');
    });
  };
  frequencies = function(items) {
    var fs;
    fs = {};
    _.each(items, function(item) {
      return fs[item] = (fs[item] || 0) + 1;
    });
    return fs;
  };
  print_world = function(world) {
    var cell, _i, _len, _results;
    $('td').removeClass('alive');
    _results = [];
    for (_i = 0, _len = world.length; _i < _len; _i++) {
      cell = world[_i];
      _results.push((function(cell) {
        var row, x, y, _ref;
        _ref = _.map(cell.split(','), function(v) {
          return parseInt(v);
        }), x = _ref[0], y = _ref[1];
        row = $($('table tr')[y]);
        cell = $(row.find('td')[x]);
        return cell.addClass('alive');
      })(cell));
    }
    return _results;
  };
  calc_state = function() {
    var $table, state;
    state = [];
    $table = $('table').first();
    $table.find('tr').each(function(y, row) {
      var $row;
      $row = $(row);
      return $row.find('td').each(function(x, cell) {
        if ($(cell).hasClass('alive')) {
          return state.push([x, y].join(','));
        }
      });
    });
    return state;
  };
  run_life = function(state) {
    var next_state;
    next_state = state;
    return setInterval((function() {
      next_state = evolution(next_state);
      return print_world(next_state);
    }), 100);
  };
  $(function() {
    var mousedown, row, _fn;
    _fn = function(row) {
      var cell, _results;
      row = $('<tr>');
      $('table').first().append(row);
      _results = [];
      for (cell = 1; cell <= 50; cell++) {
        _results.push((function(cell) {
          var $cell;
          $cell = $('<td>');
          return row.append($cell);
        })(cell));
      }
      return _results;
    };
    for (row = 1; row <= 50; row++) {
      _fn(row);
    }
    mousedown = false;
    $('table').mousedown(function() {
      return mousedown = true;
    });
    $('table').mouseup(function() {
      return mousedown = false;
    });
    $('td').hover(function() {
      if (mousedown) {
        return $(this).addClass('alive');
      }
    });
    $('button').click(function() {
      return run_life(calc_state());
    });
    return $('button.clear').click(function() {
      return $('.alive').removeClass('alive');
    });
  });
}).call(this);
