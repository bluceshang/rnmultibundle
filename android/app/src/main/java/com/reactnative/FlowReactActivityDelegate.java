package com.reactnative;

import android.app.Activity;
import android.support.v4.app.FragmentActivity;

import com.facebook.react.ReactActivityDelegate;

import javax.annotation.Nullable;

public class FlowReactActivityDelegate extends ReactActivityDelegate {
    private FlowReactNativeHost mReactNativeHost;

    public FlowReactActivityDelegate(Activity activity, @Nullable String mainComponentName) {
        super(activity, mainComponentName);
    }

    public FlowReactActivityDelegate(FragmentActivity fragmentActivity, @Nullable String mainComponentName) {
        super(fragmentActivity, mainComponentName);
    }

    public void setReactNativeHost(FlowReactNativeHost reactNativeHost) {
        this.mReactNativeHost = reactNativeHost;
    }

    @Override
    public FlowReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
