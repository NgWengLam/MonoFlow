import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

/**
 * InputWithLabel
 */
const InputWithLabel = (props: any) => {
    const isHorizontal = props.orientation === 'horizontal';
    return (
        <View style={[inputStyles.container, isHorizontal && inputStyles.horizontal]}>
            <Text style={inputStyles.label}>{props.label}</Text>
            <TextInput
                style={[
                    inputStyles.input,
                    props.error && { borderColor: '#DC2626' },
                    props.editable === false && inputStyles.inputDisabled,
                    props.style,
                ]}
                placeholderTextColor="#94A3B8"
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                {...props}
            />

        </View>
    );
};

/**
 * AppButton
 */
const AppButton = (props: any) => {
    const themeColors: Record<string, string> = {
        success: '#16A34A',
        info: '#0284C7',
        warning: '#D97706',
        danger: '#DC2626',
        primary: '#2563EB',
    };
    const bg = props.disabled ? '#94A3B8' : themeColors[props.theme] ?? '#2563EB';

    return (
        <TouchableNativeFeedback onPress={props.disabled ? null : props.onPress}>
            <View style={[
                buttonStyles.button,
                { backgroundColor: bg },
                props.fullWidth && { width: '100%' }
            ]}>
                <Text style={buttonStyles.buttonText}>
                    {props.title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

/**
 * PickerWithLabel
 */
type PickerWithLabelProps = {
    label: string;
    items: any[];
    selectedValue: string;
    onValueChange: (input: string) => void;
    orientation?: string;
};

const PickerWithLabel = (props: PickerWithLabelProps) => {
    const isHorizontal = props.orientation === 'horizontal';
    return (
        <View style={[pickerStyles.container, isHorizontal && pickerStyles.horizontal]}>
            <Text style={pickerStyles.label}>{props.label}</Text>
            <View style={pickerStyles.pickerWrapper}>
                <Picker
                    style={pickerStyles.picker}
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}>
                    {props.items.map((item: any) => (
                        <Picker.Item label={item.value} value={item.key} key={item.key} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const inputStyles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 10, 
    },
    label: {
        fontSize: 13, 
        fontWeight: '600',
        color: '#64748B', 
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1.2, 
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1, // Thinner border
        borderColor: '#CBD5E1',
        borderRadius: 12, // More rounded corners
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#1E293B',
        // Soft iOS/Android shadow instead of heavy elevation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputDisabled: {
        backgroundColor: '#F8FAFC',
        color: '#475569',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const buttonStyles = StyleSheet.create({
   button: {
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 14, // Consistent rounding
        alignItems: 'center',
        justifyContent: 'center',
        height: 56, // Fixed height for a substantial feel
        elevation: 4,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 0.5,
    },
});

const pickerStyles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    pickerWrapper: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        elevation: 1,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        color: '#1E293B',
    },
});

/**
 * DateTimePickerWithLabel
 */
export const formatted = (inputDate: Date) => {
    const daysText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${daysText[inputDate.getDay()]}, ${monthsText[inputDate.getMonth()]} ${inputDate.getDate()}, ${inputDate.getFullYear()}`;
};

const DateTimePickerWithLabel = (props: any) => {
    const openDatePicker = () => {
        DateTimePickerAndroid.open({
            value: props.value,
            mode: 'date',
            is24Hour: false,
            onChange: props.onChange,
        });
    };

    return (
        <View style={datePickerStyles.container}>
            <Text style={datePickerStyles.label}>DATE</Text>
            <TouchableWithoutFeedback onPress={openDatePicker}>
                <View style={datePickerStyles.inputWrapper}>
                    <TextInput
                        style={datePickerStyles.input}
                        value={formatted(props.value)}
                        editable={false}
                        placeholderTextColor="#94A3B8"
                        underlineColorAndroid="transparent"
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const datePickerStyles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    inputWrapper: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        elevation: 1,
    },
    input: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1E293B',
    },
});

const Card = ({ children, style }: any) => {
    return (
        <View style={[
            {
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 12,
                marginVertical: 8,
                elevation: 2
            },
            style
        ]}>
            {children}
        </View>
    );
};


export { InputWithLabel, AppButton, PickerWithLabel, DateTimePickerWithLabel, Card };
