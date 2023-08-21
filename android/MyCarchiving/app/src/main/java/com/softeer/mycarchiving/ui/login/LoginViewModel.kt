package com.softeer.mycarchiving.ui.login

import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.softeer.domain.model.Token
import com.softeer.domain.usecase.sign.SignInUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val signInUseCase: SignInUseCase
): ViewModel() {

    private val _typedEmail = MutableStateFlow("android@email.com")
    val typedEmail: StateFlow<String> = _typedEmail

    private val _typedPassword = MutableStateFlow("password")
    val typedPassword: StateFlow<String> = _typedPassword

    val errorMessage = MutableStateFlow(ERROR_NONE)
    val loginSuccess = MutableStateFlow(false)

    fun typeEmail(text: String) {
        _typedEmail.value = text
    }

    fun typePassword(text: String) {
        _typedPassword.value = text
    }

    private fun isValidEmail(): Boolean {
        return Patterns.EMAIL_ADDRESS.matcher(_typedEmail.value).matches()
    }

    fun login() {
        if (_typedEmail.value.isEmpty()) {
            errorMessage.value = EMAIL_EMPTY_ERROR
        }
        if (!isValidEmail()) {
            errorMessage.value = EMAIL_VALID_ERROR
        }
        if (_typedPassword.value.isEmpty()) {
            errorMessage.value = PASSWORD_EMPTY_ERROR
        }
        viewModelScope.launch {
            val token = signInUseCase(_typedEmail.value, _typedPassword.value)
            if (token == null) {
                errorMessage.value = TOKEN_EMPTY_ERROR
            } else {
                saveToken(token)
                loginSuccess.value = true
            }
        }
    }

    private fun saveToken(token: Token) {

    }

    companion object {
        const val ERROR_NONE = ""
        const val EMAIL_EMPTY_ERROR = "이메일을 입력해주세요"
        const val PASSWORD_EMPTY_ERROR = "비밀번호를 입력해주세요"
        const val EMAIL_VALID_ERROR = "올바른 이메일 형식으로 입력해주세요"
        const val TOKEN_EMPTY_ERROR = "가입 정보를 확인해주세요"
    }
}