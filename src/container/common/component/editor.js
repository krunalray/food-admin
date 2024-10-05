import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Loding } from './loading';

class TextEditor extends Component {

  constructor(props) {
    super(props);
    var description = "";
    description = this.props.input.value;
    this.state =  {default_message: description };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentWillMount() {
    var description = "";
    description = this.props.input.value;
    this.state =  { default_message: description };
  }

  componentWillReceiveProps(nextProps){
    var description = "";
    description = nextProps.input.value;
    this.state =  { default_message: description };
  }

  handleEditorChange(content) {
    this.props.input.onChange(content);
    this.setState({
      default_message: content
    })
  }

  render() {

    const { setHeight, setEmoction } = this.props;

    const { default_message } = this.state;

    let plugins = 'searchreplace autolink directionality visualblocks visualchars fullscreen image link media code table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern';

    let toolbar = 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat code';

    if(setEmoction) {
      plugins += ' emoticons';

      toolbar += ' | emoticons';
    }

    const height =  ((setHeight !== undefined && !isNaN(setHeight)) ? setHeight : 275);

    return (
      <Editor
        value={default_message}
        onEditorChange={this.handleEditorChange}
        init={
          {
            menubar: false,
            plugins: plugins,
            toolbar: toolbar,
            height: height,
            
          }
        }
      />
    )
  }

}

export default TextEditor;
