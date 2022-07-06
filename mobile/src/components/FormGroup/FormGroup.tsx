import { TextInput, View } from "react-native";
import { styles } from "./FormGroupStyles";
import RNPickerSelect from 'react-native-picker-select';
import PhoneInput from "react-native-phone-number-input";
import { useState } from "react";
import MultiSelect from 'react-native-multiple-select';

interface IFormGroupProps {
    placeholder: string,
    type: string,
    callback: (value: string)=>void,
    options?: {label: string, value: string}[],
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
    }

    return input;
}

function renderTextInput(props: IFormGroupProps) {
    return (
        <View>
            <TextInput
                placeholder={props.placeholder}
                style={styles.input}
                secureTextEntry={props.type === "password"}
                onChangeText={(value)=>{
                    props.callback(value);
                }}
            />
        </View>
    )
}

function renderPhoneInput(props: IFormGroupProps) {
    return (
        <View>
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
            />

        </View>
    )
}

export function renderSelectInput(props: IFormGroupProps) {
    return (
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => {
                props.callback(value)
            }}
            placeholder={{label: props.placeholder, value: null }}
            style={{inputIOS: styles.input, inputAndroid: styles.input}}
            items={props.options ? props.options : []}
            
        />
    );
};

export function RenderMultiSelectInput(props: IFormGroupProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <MultiSelect
          hideTags
          items={props.options ? props.options : []}
          uniqueKey="value"
          onSelectedItemsChange={(value)=>{setSelectedItems(value)}}
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
          itemTextColor="#000"
          displayKey="label"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Selecionar"
          noItemsText="Nenhuma turma disponível"
        />
    );
};