import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class DatabaseUsage extends Component {
  
  render() {
      let datasize_traces = []
      let datasize_graph_data = {};
      
      Object.keys(this.props.database_datasize_data).forEach(entry => {if (this.props.database_datasize_data[entry].data.DATABASE in datasize_graph_data ===false) {
        datasize_graph_data[this.props.database_datasize_data[entry].data.DATABASE] = {
          x: [], 
          y: [], 
          name: this.props.database_datasize_data[entry].data.DATABASE, 
          stackgroup: 'one', 
          hovertemplate: '%{y} GB',
        };
      }
      datasize_graph_data[this.props.database_datasize_data[entry].data.DATABASE].x.push(this.props.database_datasize_data[entry].data.DATE);
      datasize_graph_data[this.props.database_datasize_data[entry].data.DATABASE].y.push(this.props.database_datasize_data[entry].data.AVERAGE_DAILY_USAGE_GIGABYTES.toFixed(2));
    })

      Object.keys(datasize_graph_data).forEach(entry => datasize_traces.push(datasize_graph_data[entry]))

      const PlotlyComponent = createPlotlyComponent(Plotly);                

      let layout = {
        "title": 'Daily Gigabyte Usage by Database - Last 30 Days', 
        "autosize": true, 
        "titlefont": { 
          "size": 16, 
          "color": "black" 
        }, 
        "font": { 
          "size": 8, 
          "color": "black" 
        }, 
        "legend": { 
          "orientation": "h",
          "y": -.1 
        }, 
        "yaxis": {
          "title": 'Gigabytes', 
          "titlefont": { 
            "size": 12, 
            "color": "black" 
          }, 
          "automargin": true, 
          "showgrid": false, 
          "showline": true
        }, 
        "hovermode": "closest", 
        "hoverlabel": { 
          "namelength": -1 
        }, 
        "xaxis": { 
          "automargin": true, 
          "showgrid": false 
        }
      };
      let useResizeHandler = true;
      let style = {"width": "100%", "height": "100%"};

      return (
          <PlotlyComponent data={datasize_traces} layout={layout} useResizeHandler={useResizeHandler} style={style}/>
      );
  }
}


export default DatabaseUsage