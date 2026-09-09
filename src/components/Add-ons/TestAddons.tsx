import { Tabs } from '@mantine/core';
import classes from './Demo.module.css';

export default function Demo() {
    return (
        <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
            <Tabs.List grow>
                <Tabs.Tab
                    value="settings"
                >
                    Settings
                </Tabs.Tab>
                <Tabs.Tab
                    value="messages"
                >
                    Messages
                </Tabs.Tab>
                <Tabs.Tab
                    value="gallery"
                >
                    Gallery
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    );
}