import Vue from '../assets/vue.js';
import mitt from '../../mitt/mitt.js';
const {on,emit} = mitt()
const {h, createApp,ref,reactive} = Vue;

export function useBoozJsV3DateLine({dataQuJian, active,change}) {

  const timelineSelect = {
    emits:['change'],
    props: ['timelineSelect','newcss'],
    render({$emit}) {
      const timelineData = this.timelineSelect;
      function getStartYear(interval){
        return parseInt(interval[0].toString().substr(0, 4))
      }
      function getEndYear(interval){
        return  parseInt(interval[1].toString().substr(0, 4));
      }
      function getActionYear(active){
        return  parseInt(active.toString().substr(0, 4));
      }

      function getActionMonth(active){
        return parseInt(active.toString().substr(4, 6));

      }

      function castMonthStr(monthStr){
        if(monthStr.length==1){
          return '0'+monthStr
        }
        return monthStr
      }
      const yearRender=(timelineSelect,yearNumber,actionMonth)=>{
        return h('div', {
          class: 'year-button',
          onclick:()=>{
            const year = parseInt(event.target.textContent);
            timelineSelect.active=parseInt(year+castMonthStr(getActionMonth(timelineData.active).toString()))
          }
        }, yearNumber)
      }

      const monthRender=(timelineSelect,yearNumber)=>{
        return  h('ul', {class: 'month'}, Array.from(new Array(12 + 1).keys()).slice(1).reverse().map((number)=> {
          return h('li', {
            onclick: (event) => {
              const month = parseInt(event.target.textContent);
              const monthStr = month.toString().length==1?'0'+month:month;
              timelineSelect.active=parseInt(getActionYear(timelineSelect.active)+monthStr.toString())
              emit('change',this.timelineSelect);
            },
            class: getActionYear(timelineData.active) == yearNumber && getActionMonth(timelineData.active) == number ? 'active' : ''
          }, [h('a', {
            href: '#',
            data: '12'
          }, `${number}月`)]);
        }))
      }


      const years = Array.from(new Array(getEndYear(timelineData.interval) + 1).keys()).slice(getStartYear(timelineData.interval)).map(yearNumber => {
        return h('li', {
              id: 'now',
              class: getActionYear(timelineData.active) == yearNumber ? 'active' : ''
            },
            [
              yearRender(this.timelineSelect,yearNumber,getActionMonth(timelineData.active)),
              monthRender(this.timelineSelect,yearNumber)
            ]);

      });

      return h('div', {
            class: 'timeline '+this.newcss,
            style: 'display:block !important;',
            id: 'timeline'
          }, [h('ul', {
            class: 'year',
            id: 'year'
          }, years)]
      );

    }
  };

  const dom = document.createElement('div');
  const createDom = () => document.body.append(dom);

  dom.setAttribute('id', 'app');
  createDom();
  // dom.innerHTML = `<timeline-select v-model:value="timelineData" @change()></timeline-select>`;
  const timelineSelectData= reactive({
    interval: dataQuJian,
    active
  })
  console.log(timelineSelectData);
  const app=createApp(timelineSelect, {
    timelineSelect:timelineSelectData,
    newcss:'dytimeline'
  })
  app.mount(dom);
  on('change',change);

}
