/*
 * generated by Xtext 2.18.0
 */
package com.novomind.language.server


/**
 * Initialization support for running Xtext languages without Equinox extension registry.
 */
class ExpressionStandaloneSetup extends ExpressionStandaloneSetupGenerated {

	def static void doSetup() {
		new ExpressionStandaloneSetup().createInjectorAndDoEMFRegistration()
	}
}
