package com.reactnative.flow;

import android.app.Application;

import com.reactnative.FlowReactNativeHost;

import java.util.HashMap;

public final class ReactHosManager {
    private static final HashMap<String, FlowReactNativeHost> nativeHosts = new HashMap<>();

    public static FlowReactNativeHost getNativeHost(Application context, String pluginName) {
        if (nativeHosts.containsKey(pluginName)) {
            return nativeHosts.get(pluginName);
        } else {
            FlowReactNativeHost reactNativeHost = createCommonNativeHost(context, pluginName);
            nativeHosts.put(pluginName, reactNativeHost);
            return reactNativeHost;
        }
    }

    private static FlowReactNativeHost createCommonNativeHost(Application context, String pluginName) {
        return new FlowReactNativeHost(context, pluginName);
    }

}
