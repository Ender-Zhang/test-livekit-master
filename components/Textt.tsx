import React from "react";
import { Text } from "react-native";

export default function Textt(text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) {
    return <Text>{text}</Text>;
    }