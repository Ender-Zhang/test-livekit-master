/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-07 14:08:46
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-10 22:04:13
 * @FilePath: \interaction-app\components\CancelButton.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Center, AlertDialog } from "native-base";
import React from "react";

const CacenelButton = ({ navigation, route }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
  
    const onClose = () => setIsOpen(false);
  
    const cancelRef = React.useRef(null);
    return <Center>
        <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
            Cancel
        </Button>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Cancel Practice</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure to cancel this session? You will lose all the data.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={ () => {
                    onClose();
                }} ref={cancelRef}>
                  No
                </Button>
                <Button colorScheme="danger" onPress={() => {
                    // navigation.navigate('MainScreen', { task_id: 'Practice 1' });
                    navigation.navigate('MainScreen', { task_id: task_id });
                    onClose();
                }}>
                  Yes
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
  };

  export default CacenelButton;