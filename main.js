Vue.component('task-list', {
  data() {
    return {
      tasks: [
        { task: 'Go to the store', complete: true },
        { task: 'Go to the drugstore', complete: false },
        { task: 'Go to the farm', complete: true },
        { task: 'Go to work', complete: false }
      ]
    }
  },
  template: `
    <ul>
      <task v-for="task in tasks">{{ task.task }}</task>
    </ul>
  `
});

Vue.component('task', {
  template: '<li><slot></slot></li>'
});

new Vue({
  el: '#root'
});
