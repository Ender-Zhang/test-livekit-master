import React from "react";
import { View, Text, Radio } from "native-base";

export default function RGroup(props:any) {
    // const [option, setOption] = React.useState('');
    const content = props.content;

    const [options, setOptions] = React.useState<{ [key: string]: string }>({});
  
    const handleOptionChange = (name: string, value: string) => {
      setOptions((prev) => ({ ...prev, [name]: value }));
    };

    const inputComponent = (
    <View>
        {Object.entries(content).map(([key, value]) => (
            <View key={key}>
                <Text>{key}</Text>
                <Radio.Group
                    name={key}
                    value={options[key] ?? ''}
                    onChange={(value) => handleOptionChange(key, value)} >
                    {value.map((option:any, index:any) => (
                    <Radio value={option} key={index}>{option}</Radio>
                    ))}
                </Radio.Group>
            </View>

        ))}
        </View>
    );
    return (
        <View>
            {inputComponent}
        </View>

    );
}