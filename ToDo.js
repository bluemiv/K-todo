import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {isEditing: false, toDoValue: props.text}
    }
    static propTypes = {
        isCompleted: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        uncompletedToDo: PropTypes.func.isRequired,
        completedToDo:PropTypes.func.isRequired,
        updateToDo:PropTypes.func.isRequired,
    }
    render() {
        const { isEditing, toDoValue } = this.state;
        const { isCompleted, text, id, deleteToDo } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleToDo}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle
                        ]}/>
                    </TouchableOpacity>
                    {isEditing ?
                    <TextInput
                        style={[
                            styles.text,
                            styles.input,
                            isCompleted ? styles.completedText : styles.uncompletedText
                        ]}
                        value={toDoValue}
                        multiline={true}
                        onChangeText={this._controllInput}
                        returnKeyType={"done"}
                        onBlur={this._finishEditing}
                        />
                    :
                    <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                        {text}
                    </Text>
                    }
                    
                </View>
                <View style={styles.column}>
                    {isEditing ? 
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>완료</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                     : 
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>수정</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>삭제</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }

    _toggleToDo = () => {
        const { isCompleted, uncompletedToDo, completedToDo, id } = this.props;
        if (isCompleted) {
            uncompletedToDo(id);
        } else {
            completedToDo(id);
        }
    }

    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        })
    }

    _finishEditing = () => {
        const { id, updateToDo } = this.props;
        const { toDoValue } = this.state;
        
        updateToDo(id, toDoValue);

        this.setState({
            isEditing: false
        })
    }

    _controllInput = text => {
        this.setState({
            toDoValue: text
        })
    }
}
const styles = StyleSheet.create({
    container: {
        width: width - 100,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text:{
        fontSize: 15,
        marginVertical: 20,
        fontWeight: "bold"
    },
    completedText: {
        color: "gray",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#000"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 15
    },
    completedCircle:{
        borderColor: "gray",
    },
    uncompletedCircle: {
        borderColor: "red",
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
    },
    actions: {
        flexDirection: "row",
    },
    actionContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
    actionText: {

    },
    input: {
        marginVertical: 16,
        width: width / 2
    }
});