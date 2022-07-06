import { TextInput, View, Text } from "react-native";
import { styles } from "./FormGroupStyles";
import RNPickerSelect from 'react-native-picker-select';
import PhoneInput from "react-native-phone-number-input";
import { useState } from "react";
import MultiSelect from 'react-native-multiple-select';
import DatePicker from "react-native-datepicker";
import MaskInput from 'react-native-mask-input';

interface IFormGroupProps {
    placeholder: string,
    type: string,
    callback: (value: string | string[])=>void,
    options?: {label: string, value: string}[],
    errorMessage?: string,
}

export function FormGroup(props: IFormGroupProps) {
    return (
        <View>
            {renderInput(props)}
        </View>
    )
}

function renderInput(props: IFormGroupProps) {
    let input;
    switch(props.type) {
        case "text":
            input = renderTextInput(props);
            break;
        case "password":
            input = renderTextInput(props);
            break;
        case "phone":
            input = renderPhoneInput(props);
            break;
        case "select":
            input = renderSelectInput(props);
            break;
        case "multiSelect":
            input = RenderMultiSelectInput(props);
            break;
        case "date":
            input = RenderDateInput(props);
            break;
    }

    return input;
}

function renderTextInput(props: IFormGroupProps) {
    return (
        <View style={styles.inputView}>
            <TextInput
                placeholder={props.placeholder}
                style={styles.input}
                secureTextEntry={props.type === "password"}
                onChangeText={(value)=>{
                    props.callback(value);
                }}
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}

function renderPhoneInput(props: IFormGroupProps) {
    return (
        <View style={styles.inputView}>
            <PhoneInput
                defaultCode="BR"
                withDarkTheme
                withShadow
                placeholder={props.placeholder}
                textInputStyle={styles.phoneTextInput}
                containerStyle={styles.phoneInput}
                codeTextStyle={styles.phoneCodeText}
                countryPickerButtonStyle={styles.phoneButtonInput}
                textContainerStyle={styles.phoneTextInputContainer}
                onChangeFormattedText={(value)=>{
                    const formatedValue = value.substr(1,value.length-1);
                    props.callback(formatedValue)
                }}
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}

export function renderSelectInput(props: IFormGroupProps) {
    return (
        <View style={styles.inputView}>
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => {
                    props.callback(value)
                }}
                placeholder={{label: props.placeholder, value: null }}
                style={{inputIOS: styles.input, inputAndroid: styles.input}}
                items={props.options ? props.options : []}
                
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    );
};

export function RenderMultiSelectInput(props: IFormGroupProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <View style={styles.inputView}>
        <MultiSelect
            hideTags
            items={props.options ? props.options : []}
            uniqueKey="value"
            onSelectedItemsChange={(value)=>{
                setSelectedItems(value);
                props.callback(value);
            }}
            selectedItems={selectedItems}
            selectText="Turmas"
            searchInputPlaceholderText="Buscar turmas..."
            onChangeInput={ (text)=> console.log(text)}
            //altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            styleTextDropdown={styles.dropdownMenuTextUnset}
            styleTextDropdownSelected={styles.dropdownMenuText}
            styleDropdownMenu={styles.dropdownMenu}
            styleMainWrapper={styles.mainWrapper}
            styleSelectorContainer={styles.mainWrapper}
            itemTextColor="#000"
            displayKey="label"
            searchInputStyle={styles.searchInput}
            styleInputGroup={styles.searchInputBox}
            submitButtonColor="#F97E0D"
            styleIndicator={styles.selectButton}
            submitButtonText="Selecionar"
            //hideDropdown
            noItemsText="Nenhuma turma disponível"
        />
        <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    );
};

export function RenderDateInput(props: IFormGroupProps) {
    const [date, setDate] = useState('');

    return (
        <View style={styles.inputView}>
        <MaskInput
            style={styles.input}
            value={date}
            onChangeText={(masked, unmasked) => {
                setDate(masked);
                const [day, month, year] = masked.split("/");
                props.callback(`${year}-${month}-${day}`);
            }}
            mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,]}
            placeholder={props.placeholder}
        />
        <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}