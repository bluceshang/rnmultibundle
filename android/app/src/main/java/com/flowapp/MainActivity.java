package com.flowapp;

import android.view.KeyEvent;

import com.reactnative.BaseReactActivity;

public class MainActivity extends BaseReactActivity {

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (getReactNativeHost() != null && getReactNativeHost().hasInstance() && getReactNativeHost().getUseDeveloperSupport()) {
            //菜单键(只有长按才会回调此方法)，音量键
            if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN || keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
                getReactNativeHost().getReactInstanceManager().showDevOptionsDialog();
                return true;
            }
        }
        return super.onKeyUp(keyCode, event);
    }
}
