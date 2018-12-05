package com.reactnative;

import android.app.Application;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.CatalystInstanceImpl;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.shell.MainReactPackage;
import com.flowapp.BuildConfig;
import com.reactnative.flow.RNBundleLoaderListener;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

/**
 * 1.自动加载base.android.bundle文件
 * 2.加载完之后回调给Activity，继续完成加载当前页面
 */
public class FlowReactNativeHost extends ReactNativeHost {
    private String mPluginId;
    private boolean hasLoadedBundle;
    private RNBundleLoaderListener mLoaderListener;

    public FlowReactNativeHost(Application application, String pluginId) {
        super(application);
        mPluginId = pluginId;
        hasLoadedBundle = false;
        ReactInstanceManager.ReactInstanceEventListener listener = new ReactInstanceManager.ReactInstanceEventListener() {

            @Override
            public void onReactContextInitialized(ReactContext reactContext) {
                initFinish();
            }
        };
        getReactInstanceManager().addReactInstanceEventListener(listener);
        if (!getReactInstanceManager().hasStartedCreatingInitialContext()) {
            getReactInstanceManager().createReactContextInBackground();
        }
    }

    private void initFinish() {
        ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
        JSBundleLoader bundleLoader = JSBundleLoader.createAssetLoader(reactContext, "assets://" + mPluginId, false);
        bundleLoader.loadScript((CatalystInstanceImpl) reactContext.getCatalystInstance());
        hasLoadedBundle = true;
        if (mLoaderListener != null) {
            mLoaderListener.onSuccess();
        }
    }

    public void loadBundle(RNBundleLoaderListener listener) {
        if (!hasLoadedBundle) {
            mLoaderListener = listener;
        } else {
            listener.onSuccess();
        }
    }

    @Override
    public boolean getUseDeveloperSupport() {
//        return BuildConfig.DEBUG;
        return false;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage()
        );
    }

    @Nullable
    @Override
    protected String getBundleAssetName() {
        return "base.android.bundle";
    }
}
