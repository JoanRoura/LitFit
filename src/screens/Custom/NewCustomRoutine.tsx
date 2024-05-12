import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Modal, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Exercise } from '../../interfaces/exerciseInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Routine } from '../../interfaces/routineInterface';
import { useExercise } from '../../hooks/useExercise';
import { ExerciseCard } from '../../components/ExerciseCard';
import { SearchInput } from '../../components/SearchInput';
import { useCustomRoutine } from '../../hooks/useCustomRoutine';
import { supabase } from '../../database/supabase';
import { useAuth } from '../../context/authContext/AuthContext';

export const NewCustomRoutine = () => {
    const navigation = useNavigation<any>();

    const { top } = useSafeAreaInsets();

    const { user } = useAuth();
    const { getExercises, exercises } = useExercise();
    const {
        getCustomRoutines,
        createCustomRoutine,
        addExercisesToRoutine
    } = useCustomRoutine(user ? user.id : '');

    const [modalNameRoutineVisible, setModalNameRoutineVisible] = useState(false);
    const [modalExercisesVisible, setModalExercisesVisible] = useState(false);

    const [bgModalName, setBgModalName] = useState(false); // State per controla la opacitat de la pantalla

    const [tempName, setTempName] = useState('');
    const [temporarySelectedExercises, setTemporarySelectedExercises] = useState<Exercise[]>([]);
    const [finalSelectedExercises, setFinalSelectedExercises] = useState<Exercise[]>([]);

    const [customRoutine, setCustomRoutine] = useState<Routine>({
        id: 0,
        name: '',
        id_user: user ? user.id : '',
        is_default: false,
        muscle: '', // TODO en un futur canviar aixo
        desc: '',
        image: '',
    });

    const [exercisesFiltered, setExercisesFiltered] = useState<Exercise[]>([]);
    const [term, setTerm] = useState('');

    const handleOpenModal = () => {
        setTempName(customRoutine.name!);
        setModalNameRoutineVisible(true);
    };

    const handleSave = () => {
        setCustomRoutine(prevRoutine => ({ ...prevRoutine, name: tempName }));
        setModalNameRoutineVisible(false);
    };

    const handleCancel = () => {
        setModalNameRoutineVisible(false);
    };

    const toggleExercise = (exercise: Exercise) => {
        const index = temporarySelectedExercises.findIndex(ex => ex.id === exercise.id);
        if (index >= 0) {
            // Si el ejercicio ya está en la lista temporal, lo eliminamos
            setTemporarySelectedExercises(temporarySelectedExercises.filter(ex => ex.id !== exercise.id));
        } else {
            // Si el ejercicio no está en la lista temporal, lo añadimos
            setTemporarySelectedExercises([...temporarySelectedExercises, exercise]);
        }
    };

    const saveExercises = () => {
        // Concatenar los ejercicios temporales con los ejercicios finales existentes
        const updatedExercises = [...finalSelectedExercises, ...temporarySelectedExercises];

        // Eliminar duplicados (opcional)
        const uniqueExercises = Array.from(new Set(updatedExercises.map(exercise => exercise.id))).map(id => {
            return updatedExercises.find(exercise => exercise.id === id)!;
        });

        // Establecer la lista de ejercicios finales actualizada
        setFinalSelectedExercises(uniqueExercises);

        // Limpiar la lista de ejercicios temporales
        setTemporarySelectedExercises([]);

        console.log("Ejercicios guardados: ", uniqueExercises);
    };

    const saveCustomRoutine = async () => {
        // Obtener el último ID de la rutina en la base de datos
        const { data: lastRoutineId, error } = await supabase
            .from('routines')
            .select('id', { count: 'exact' })
            .order('id', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Error fetching last routine ID:', error.message);
            return;
        }

        // Calcular el nuevo ID sumando 1 al último ID obtenido
        const newRoutineId = lastRoutineId ? lastRoutineId[0].id + 1 : 1;

        console.log(newRoutineId);
        console.log(customRoutine);

        const tmpCustomRoutine = {
            ...customRoutine,
            id: newRoutineId,
        }

        // Crear la rutina con el nuevo ID calculado
        console.log('new', tmpCustomRoutine);
        const success = await createCustomRoutine(tmpCustomRoutine);

        if (success) {
            // Filtrar los valores undefined de finalSelectedExercises y luego obtener los IDs de los ejercicios
            const exerciseIds = finalSelectedExercises.filter(exercise => exercise.id !== undefined).map(exercise => exercise.id!);
            console.log('Abans de passar a el Hook', exerciseIds);

            // Añadir ejercicios a la rutina con el nuevo ID calculado
            await addExercisesToRoutine(newRoutineId, exerciseIds);

            await getCustomRoutines();

            navigation.pop()
        }
    };

    useEffect(() => {
        if (term.length === 0) {
            return setExercisesFiltered([]);
        }

        if (isNaN(Number(term))) {
            setExercisesFiltered(
                exercises.filter(
                    (exercise) => exercise.name.toLowerCase()
                        .includes(term.toLowerCase())
                )
            );
        }
    }, [term]);

    return (
        <View style={{ ...styles.container, marginBottom: (Platform.OS === 'ios') ? 80 : 60 }}>

            <View style={{ ...styles.containerNameCustomRoutine, paddingTop: top + 15, }}>

                {/* Boton de 'Go Back' */}
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity
                        style={{
                            marginTop: (Platform.OS === 'ios') ? top - 10 : top + 10,
                        }}
                        // ? En el onPress naveguem a la pagina anterior
                        onPress={() => navigation.pop()}
                    >
                        <Icon
                            name="arrow-back-outline"
                            color="white"
                            size={25}
                        />
                    </TouchableOpacity>
                    {/* // * Button Change Name Routine */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleOpenModal}
                    >
                        <View style={styles.containerIconAndNameRoutine}>
                            <Text style={styles.nameCustomRoutine}>{customRoutine?.name ? customRoutine?.name : 'New Custom Routine'}</Text>

                            <Icon
                                color='white'
                                size={25}
                                name="create-outline"
                            />
                        </View>

                        <Text style={styles.textEdit}>Edit mode</Text>
                    </TouchableOpacity>
                </View>


                <Text style={{ ...styles.textPleaseAddExercises, color: 'white' }}>Please add your first exercise</Text>
            </View>


            <View style={styles.positionBtnExercise}>
                <TouchableHighlight
                    style={{ borderRadius: 12 }}
                    onPress={() => setModalExercisesVisible(true)}
                >
                    <View style={styles.btnAddExercises}>
                        <Text style={styles.textAddExercises}>+ Add exercises</Text>
                    </View>
                </TouchableHighlight>
            </View>

            {/* // * FlatList of Exercises  */}
            <FlatList
                data={finalSelectedExercises}
                keyExtractor={(exercise) => exercise.id!.toString()}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => <ExerciseCard exercise={item} />}
            />

            <View style={{ padding: 10 }}>
                <TouchableHighlight
                    style={{ borderRadius: 10, }}
                    onPress={() => {
                        saveCustomRoutine();
                    }}
                >
                    <View style={styles.btnSaveExercisesAdded}>
                        <Text style={styles.txtSaveExercisesAdded}>SAVE</Text>
                    </View>
                </TouchableHighlight>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNameRoutineVisible}
                onRequestClose={() => {
                    setModalNameRoutineVisible(!modalNameRoutineVisible);
                }}
            >
                {/* Overlay que cubre la pantalla para el efecto de opacidad */}
                <TouchableWithoutFeedback onPress={() => setBgModalName(false)}>

                    <View style={styles.fullScreenOverlay}>

                        <View style={styles.modalNameView}>
                            <View style={styles.inputNameCustomRoutine}>
                                <TextInput
                                    placeholder="New training"
                                    style={{
                                        ...styles.textInput,
                                        top: (Platform.OS === 'ios') ? 0 : 2,
                                    }}
                                    value={tempName}
                                    onChangeText={setTempName}
                                />
                            </View>

                            <View style={styles.containerButtonsSaveCancel}>
                                <View style={styles.container}>
                                    <TouchableHighlight
                                        onPress={handleCancel}
                                    >
                                        <View style={styles.btnCancelSaveNameCustomRoutine}>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                                                Cancel
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>

                                <View style={styles.container}>
                                    <TouchableHighlight
                                        onPress={handleSave}
                                    >
                                        <View style={styles.btnSaveNameCustomRoutine}>
                                            <Text style={{ color: '#1E3FC9', fontSize: 16, fontWeight: 'bold' }}>
                                                Save
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExercisesVisible}
                onRequestClose={() => {
                    setModalExercisesVisible(!modalExercisesVisible);
                }}
            >
                <View style={styles.modalExercisesView}>
                    <View style={styles.inputContainer}>
                        <View>
                            <Text
                                style={{
                                    ...styles.titleListExercises,
                                    top: top + 15,
                                    color: '#000',
                                }}
                            >
                                Add exercises
                            </Text>
                        </View>

                        <SearchInput
                            onDebounce={(value) => setTerm(value)}
                        />
                    </View>

                    <FlatList
                        data={term ? exercisesFiltered : exercises}
                        keyExtractor={(exercise) => exercise.id!.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                onPress={() => {
                                    console.log(item);
                                    toggleExercise(item);
                                }}
                                style={{ borderRadius: 10, paddingBottom: -10 }}
                            >
                                <View style={{ paddingBottom: -10 }}>
                                    <ExerciseCard exercise={item} />
                                </View>
                            </TouchableHighlight>
                        )}

                        // * Configuracio del 'Infinite Scroll'
                        onEndReached={getExercises}
                        onEndReachedThreshold={0.4}

                        ListFooterComponent={(
                            <ActivityIndicator
                                style={{ height: 100 }}
                                size={20}
                                color="grey"
                            />
                        )}
                    />

                    <View>
                        <TouchableHighlight
                            style={{ borderRadius: 10, }}
                            onPress={() => {
                                saveExercises();
                                console.log('Ejercicios seleccionados:', finalSelectedExercises);
                                setModalExercisesVisible(false);
                            }}
                        >
                            <View style={styles.btnSaveExercisesAdded}>
                                <Text style={styles.txtSaveExercisesAdded}>ADD {temporarySelectedExercises.length} EXERCISES</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerNameCustomRoutine: {
        backgroundColor: '#1E3FC9',
        padding: 20,
        flexDirection: 'column',
        gap: 20,
    },
    containerIconAndNameRoutine: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    nameCustomRoutine: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textEdit: {
        color: '#fff',
        fontSize: 12,
    },
    textPleaseAddExercises: {
        fontSize: 12,
        textAlign: 'center',
    },

    positionBtnExercise: {
        position: 'relative',
        bottom: 15,
    },
    btnAddExercises: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    textAddExercises: {
        color: '#000',
        fontSize: 16,
    },

    containerExercisesToAdd: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    modalNameView: {
        gap: 4,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    inputNameCustomRoutine: {
        backgroundColor: '#e1e1e1',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 8,
        marginBottom: 1,
    },

    containerButtonsSaveCancel: {
        flexDirection: 'row',
    },
    btnCancelSaveNameCustomRoutine: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    btnSaveNameCustomRoutine: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },

    modalExercisesView: {
        flex: 1,
        marginTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#e1e1e1",
        overflow: 'hidden',
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 10,
    },
    inputContainer: {
        display: 'flex',
        gap: 24,
    },
    titleListExercises: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    btnSaveExercisesAdded: {
        borderRadius: 10,
        backgroundColor: '#1E3FC9',
        paddingVertical: 10,
        alignItems: 'center',
    },
    txtSaveExercisesAdded: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },

    item: {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    selectedItem: {
        padding: 10,
        backgroundColor: 'lightblue',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    normalItem: {
        backgroundColor: '#FFFFFF', // Color normal sin selección
    },

    fullScreenOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
});
